from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "NexoBot AI Business Assistant"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "super-secret-key-change-it-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # Database
    DATABASE_URL: str = "postgresql://user:pass@localhost/bizmuth"
    
    # AI
    GEMINI_API_KEY: Optional[str] = None
    VECTOR_DB_URL: Optional[str] = None

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
