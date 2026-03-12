from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from twilio.rest import Client
from ..core.config import settings

router = APIRouter(prefix="/enquiries", tags=["enquiries"])

class EnquiryIn(BaseModel):
    firstName: str
    lastName:  str = ""
    phone:     str
    type:      str
    message:   str = ""

def send_email(enquiry: EnquiryIn):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"New Insurance Enquiry — {enquiry.type}"
    msg["From"]    = settings.EMAIL_FROM
    msg["To"]      = settings.ENQUIRY_EMAIL

    body = f"""
New enquiry from Diko's Assurances website:

Name:    {enquiry.firstName} {enquiry.lastName}
Phone:   {enquiry.phone}
Type:    {enquiry.type}
Message: {enquiry.message or 'N/A'}
    """.strip()

    html = f"""
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#F8F6F1;padding:32px;border-radius:8px;">
  <div style="border-bottom:1px solid rgba(201,168,76,0.3);padding-bottom:16px;margin-bottom:24px;">
    <h2 style="color:#C9A84C;margin:0;">New Insurance Enquiry</h2>
    <p style="color:rgba(248,246,241,0.5);margin:4px 0 0;">Diko's Assurances SARL</p>
  </div>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px 0;color:rgba(248,246,241,0.5);width:120px;">Name</td>
        <td style="padding:8px 0;font-weight:bold;">{enquiry.firstName} {enquiry.lastName}</td></tr>
    <tr><td style="padding:8px 0;color:rgba(248,246,241,0.5);">Phone</td>
        <td style="padding:8px 0;">{enquiry.phone}</td></tr>
    <tr><td style="padding:8px 0;color:rgba(248,246,241,0.5);">Insurance Type</td>
        <td style="padding:8px 0;color:#C9A84C;font-weight:bold;">{enquiry.type}</td></tr>
    <tr><td style="padding:8px 0;color:rgba(248,246,241,0.5);">Message</td>
        <td style="padding:8px 0;">{enquiry.message or 'N/A'}</td></tr>
  </table>
  <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(201,168,76,0.3);font-size:12px;color:rgba(248,246,241,0.4);">
    Sent automatically from dikosassurances.com
  </div>
</div>
    """

    msg.attach(MIMEText(body, "plain"))
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.EMAIL_FROM, settings.ENQUIRY_EMAIL, msg.as_string())

def send_whatsapp(enquiry: EnquiryIn):
    if not settings.TWILIO_SID or not settings.TWILIO_TOKEN:
        return
    client = Client(settings.TWILIO_SID, settings.TWILIO_TOKEN)
    client.messages.create(
        from_=settings.WHATSAPP_FROM,
        to=f"whatsapp:{settings.ENQUIRY_WHATSAPP}",
        body=(
            f"📋 *New Enquiry — Diko's Assurances*\n\n"
            f"👤 *Name:* {enquiry.firstName} {enquiry.lastName}\n"
            f"📞 *Phone:* {enquiry.phone}\n"
            f"🛡️ *Type:* {enquiry.type}\n"
            f"💬 *Message:* {enquiry.message or 'N/A'}"
        )
    )

@router.post("/")
async def submit_enquiry(enquiry: EnquiryIn):
    errors = []

    try:
        send_email(enquiry)
    except Exception as e:
        errors.append(f"Email failed: {str(e)}")

    try:
        send_whatsapp(enquiry)
    except Exception as e:
        errors.append(f"WhatsApp failed: {str(e)}")

    if len(errors) == 2:
        raise HTTPException(status_code=500, detail=" | ".join(errors))

    return {"status": "ok", "message": "Enquiry received"}
