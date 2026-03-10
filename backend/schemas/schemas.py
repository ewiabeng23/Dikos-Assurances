from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime
from ..models.models import InsuranceType, PolicyStatus


# ── CLIENT ──
class ClientCreate(BaseModel):
    first_name: str
    last_name:  str
    phone:      str
    email:      Optional[str] = None
    cni:        Optional[str] = None
    address:    Optional[str] = None

class ClientUpdate(ClientCreate):
    pass

class ClientOut(BaseModel):
    id:         int
    first_name: str
    last_name:  str
    full_name:  str
    phone:      str
    email:      Optional[str]
    cni:        Optional[str]
    address:    Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# ── POLICY ──
class PolicyCreate(BaseModel):
    client_id:     int
    policy_number: str
    type:          InsuranceType
    start_date:    date
    expiry_date:   date
    premium_xaf:   float
    notes:         Optional[str] = None

class PolicyUpdate(PolicyCreate):
    pass

class PolicyOut(BaseModel):
    id:            int
    client_id:     int
    policy_number: str
    type:          InsuranceType
    start_date:    date
    expiry_date:   date
    premium_xaf:   float
    status:        PolicyStatus
    notes:         Optional[str]
    created_at:    datetime
    client:        Optional[ClientOut]

    class Config:
        from_attributes = True


# ── REMINDER ──
class ReminderOut(BaseModel):
    id:          int
    policy_id:   int
    days_before: int
    channel:     str
    sent_at:     datetime
    success:     bool

    class Config:
        from_attributes = True


# ── AUTH ──
class Token(BaseModel):
    access_token: str
    token_type:   str = "bearer"
