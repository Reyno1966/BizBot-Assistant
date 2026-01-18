from datetime import datetime
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field
from typing import Optional

class TenantBase(SQLModel):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    industry: str  # e.g., "Beauty", "Health", "Legal"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MultiTenantModel(SQLModel):
    tenant_id: UUID = Field(foreign_key="tenant.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Tenant(TenantBase, table=True):
    pass

class Customer(MultiTenantModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    full_name: str
    phone: str
    email: Optional[str] = None
    preferences: str = ""  # For RAG context
    
class Transaction(MultiTenantModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    customer_id: UUID = Field(foreign_key="customer.id")
    amount: float
    description: str
    is_income: bool = True
    invoice_url: Optional[str] = None
