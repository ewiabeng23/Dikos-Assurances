from pydantic_settings import BaseSettings
from pathlib import Path

# Always resolve .env relative to this file's location
ENV_FILE = Path(__file__).parent.parent / ".env"

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://dikos_user:Dikos2026@127.0.0.1:5432/dikos_db"
    SECRET_KEY: str   = "dev-secret-change-in-production"
    ALGORITHM: str    = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "DikosAdmin2026"

    SMTP_HOST: str     = ""
    SMTP_PORT: int     = 587
    SMTP_USER: str     = ""
    SMTP_PASSWORD: str = ""
    EMAIL_FROM: str    = ""

    WHATSAPP_API_URL: str = ""
    WHATSAPP_FROM: str    = ""
    TWILIO_SID: str       = ""
    TWILIO_TOKEN: str     = ""

    class Config:
        env_file = str(ENV_FILE)

settings = Settings()
