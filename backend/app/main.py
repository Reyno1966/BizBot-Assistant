from fastapi import FastAPI, Depends, HTTPException
from app.core.config import settings
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_service import AIService
import json

from app.db import init_db, get_session
from sqlmodel import Session

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción poner la URL real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME} API"}

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, session: Session = Depends(get_session)):
    # 1. Buscar el Negocio (Tenant)
    from app.models.base import Tenant, Customer
    from sqlmodel import select
    
    tenant = session.get(Tenant, request.tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")
        
    tenant_context = {
        "name": tenant.name,
        "industry": tenant.industry
    }
    
    # 2. Recuperar contexto del cliente (RAG)
    customer_info = ""
    if request.customer_id:
        customer = session.get(Customer, request.customer_id)
        if customer:
            customer_info = f"Info Cliente: {customer.preferences}. Historial: Recientemente agendó un servicio."
    
    # 3. Procesar con Gemini
    full_query = f"{customer_info}\n\nMensaje del usuario: {request.message}"
    ai_output_raw = AIService.process_natural_language(full_query, tenant_context)
    
    try:
        ai_output = json.loads(ai_output_raw)
    except Exception:
        # Fallback si Gemini no devuelve JSON puro
        ai_output = {"intent": "chat", "response_text": ai_output_raw, "entities": {}}
    
    return ChatResponse(
        response=ai_output.get('response_text', "Lo siento, no pude procesar eso."),
        intent=ai_output.get('intent', 'chat'),
        action_required=ai_output.get('intent') in ["create_invoice", "book_appointment"],
        metadata=ai_output.get('entities')
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
