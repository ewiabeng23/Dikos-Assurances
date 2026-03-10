from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date, timedelta
from ..core.database import get_db
from ..core.security import get_current_user
from ..models.models import Policy, PolicyStatus
from ..schemas.schemas import PolicyCreate, PolicyUpdate, PolicyOut

router = APIRouter(prefix="/policies", tags=["policies"])


def compute_status(expiry_date: date) -> PolicyStatus:
    today = date.today()
    days_left = (expiry_date - today).days
    if days_left < 0:
        return PolicyStatus.expired
    if days_left <= 30:
        return PolicyStatus.expiring
    return PolicyStatus.active


@router.get("/", response_model=List[PolicyOut])
def list_policies(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return db.query(Policy).order_by(Policy.expiry_date.asc()).all()


@router.get("/expiring", response_model=List[PolicyOut])
def expiring_policies(db: Session = Depends(get_db), _=Depends(get_current_user)):
    """Policies expiring within 30 days or already expired."""
    threshold = date.today() + timedelta(days=30)
    return db.query(Policy).filter(Policy.expiry_date <= threshold).order_by(Policy.expiry_date.asc()).all()


@router.post("/", response_model=PolicyOut, status_code=status.HTTP_201_CREATED)
def create_policy(data: PolicyCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    policy = Policy(**data.model_dump(), status=compute_status(data.expiry_date))
    db.add(policy); db.commit(); db.refresh(policy)
    return policy


@router.get("/{policy_id}", response_model=PolicyOut)
def get_policy(policy_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    return policy


@router.put("/{policy_id}", response_model=PolicyOut)
def update_policy(policy_id: int, data: PolicyUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    for k, v in data.model_dump().items():
        setattr(policy, k, v)
    policy.status = compute_status(data.expiry_date)
    db.commit(); db.refresh(policy)
    return policy


@router.delete("/{policy_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_policy(policy_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    db.delete(policy); db.commit()
