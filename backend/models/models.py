from sqlalchemy import Column, Integer, String, Date, Numeric, ForeignKey, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..core.database import Base


class InsuranceType(str, enum.Enum):
    auto       = "Auto"
    habitation = "Habitation"
    sante      = "Santé"
    vie        = "Vie"


class PolicyStatus(str, enum.Enum):
    active   = "active"
    expiring = "expiring"
    expired  = "expired"


class Client(Base):
    __tablename__ = "clients"

    id         = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name  = Column(String(100), nullable=False)
    phone      = Column(String(30), nullable=False)
    email      = Column(String(150))
    cni        = Column(String(50))
    address    = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    policies   = relationship("Policy", back_populates="client", cascade="all, delete-orphan")

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class Policy(Base):
    __tablename__ = "policies"

    id            = Column(Integer, primary_key=True, index=True)
    client_id     = Column(Integer, ForeignKey("clients.id"), nullable=False)
    policy_number = Column(String(50), unique=True, nullable=False)
    type          = Column(Enum(InsuranceType), nullable=False)
    start_date    = Column(Date, nullable=False)
    expiry_date   = Column(Date, nullable=False)
    premium_xaf   = Column(Numeric(12, 2), nullable=False)
    status        = Column(Enum(PolicyStatus), default=PolicyStatus.active)
    notes         = Column(String(500))
    created_at    = Column(DateTime, default=datetime.utcnow)

    client        = relationship("Client", back_populates="policies")
    reminders     = relationship("Reminder", back_populates="policy", cascade="all, delete-orphan")


class Reminder(Base):
    __tablename__ = "reminders"

    id          = Column(Integer, primary_key=True, index=True)
    policy_id   = Column(Integer, ForeignKey("policies.id"), nullable=False)
    days_before = Column(Integer, nullable=False)   # 30, 14, or 7
    channel     = Column(String(20), nullable=False)  # "email" | "whatsapp"
    sent_at     = Column(DateTime, default=datetime.utcnow)
    success     = Column(Boolean, default=True)

    policy      = relationship("Policy", back_populates="reminders")
