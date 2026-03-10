"""
Reminder system — runs on a daily schedule via APScheduler.
Sends email + WhatsApp reminders at 30, 14, and 7 days before policy expiry.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
import smtplib
from email.mime.text import MIMEText
import requests
import logging

from ..core.database import SessionLocal
from ..core.config import settings
from ..models.models import Policy, Reminder
from ..schemas.schemas import ReminderOut

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/reminders", tags=["reminders"])

REMINDER_DAYS = [30, 14, 7]


def send_email(to: str, subject: str, body: str):
    if not settings.SMTP_USER:
        logger.info(f"[EMAIL MOCK] To: {to} | Subject: {subject}")
        return True
    try:
        msg = MIMEText(body, "html")
        msg["Subject"] = subject
        msg["From"]    = settings.EMAIL_FROM
        msg["To"]      = to
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as s:
            s.starttls()
            s.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            s.sendmail(settings.SMTP_USER, [to], msg.as_string())
        return True
    except Exception as e:
        logger.error(f"Email send failed: {e}")
        return False


def send_whatsapp(phone: str, message: str):
    if not settings.TWILIO_SID:
        logger.info(f"[WHATSAPP MOCK] To: {phone} | Msg: {message}")
        return True
    try:
        resp = requests.post(
            settings.WHATSAPP_API_URL,
            data={"From": settings.WHATSAPP_FROM, "To": f"whatsapp:{phone}", "Body": message},
            auth=(settings.TWILIO_SID, settings.TWILIO_TOKEN),
        )
        return resp.status_code == 201
    except Exception as e:
        logger.error(f"WhatsApp send failed: {e}")
        return False


def run_reminders():
    """Called daily by APScheduler. Checks all policies and sends reminders."""
    db: Session = SessionLocal()
    try:
        today = date.today()
        for days in REMINDER_DAYS:
            target_date = today + timedelta(days=days)
            policies = db.query(Policy).filter(Policy.expiry_date == target_date).all()

            for policy in policies:
                client = policy.client
                # Check if reminder already sent for this policy/days_before combo
                already_sent = db.query(Reminder).filter(
                    Reminder.policy_id   == policy.id,
                    Reminder.days_before == days,
                ).first()
                if already_sent:
                    continue

                subject = f"[Diko's Assurances] Rappel — Votre police expire dans {days} jours"
                body = f"""
                <p>Bonjour <strong>{client.full_name}</strong>,</p>
                <p>Votre police <strong>{policy.policy_number}</strong> ({policy.type.value})
                expire le <strong>{policy.expiry_date.strftime('%d/%m/%Y')}</strong> ({days} jours restants).</p>
                <p>Contactez Diko's Assurances SARL pour renouveler votre contrat.</p>
                <p>Tél : {settings.EMAIL_FROM or '+237 600 000 000'}</p>
                """
                msg_wa = f"Bonjour {client.full_name}, votre police {policy.policy_number} expire dans {days} jours ({policy.expiry_date}). Contactez Diko's Assurances pour renouveler."

                email_ok = send_email(client.email, subject, body) if client.email else False
                wa_ok    = send_whatsapp(client.phone, msg_wa)

                if email_ok or wa_ok:
                    db.add(Reminder(policy_id=policy.id, days_before=days, channel="email+whatsapp"))
                    db.commit()
                    logger.info(f"Reminder sent: {client.full_name} — {days}d before expiry")
    finally:
        db.close()


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(run_reminders, "cron", hour=8, minute=0, id="daily_reminders")
    scheduler.start()
    logger.info("APScheduler started — reminders run daily at 08:00")
    return scheduler


@router.get("/", response_model=list[ReminderOut])
def list_reminders(db: Session = Depends(lambda: SessionLocal())):
    return db.query(Reminder).order_by(Reminder.sent_at.desc()).limit(100).all()


@router.post("/trigger")
def trigger_now():
    """Manually trigger reminder check (for testing)."""
    run_reminders()
    return {"message": "Reminder check complete"}
