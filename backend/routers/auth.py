from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from ..core.security import verify_password, create_access_token, hash_password, get_current_user
from ..core.config import settings
from ..schemas.schemas import Token

router = APIRouter(prefix="/auth", tags=["auth"])

# In production this would check a database — for now it checks the env-var admin credentials
_ADMIN_HASH = hash_password(settings.ADMIN_PASSWORD)

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != settings.ADMIN_USERNAME or not verify_password(form_data.password, _ADMIN_HASH):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token({"sub": form_data.username})
    return Token(access_token=token)

@router.get("/me")
async def me(current_user=Depends(get_current_user)):
    return current_user
