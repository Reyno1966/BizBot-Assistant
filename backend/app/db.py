from sqlmodel import create_engine, SQLModel, Session
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, echo=True)

def init_db():
    # Esto crea las tablas en la base de datos si no existen
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
