from google import genai
from google.genai import types
from app.core.config import settings
from typing import List, Dict
import json

# Nueva configuración con el SDK más moderno de Google (Gemini 2.0)
client = genai.Client(api_key=settings.GEMINI_API_KEY)

class AIService:
    @staticmethod
    def process_natural_language(text: str, tenant_context: Dict) -> Dict:
        """
        Procesa el lenguaje natural con Gemini 2.0 Flash (el modelo más moderno)
        """
        system_prompt = f"""
        Eres NexoBot, el Asistente IA Seguro para negocios en el sector: {tenant_context['industry']}.
        
        REGLAS CRÍTICAS:
        1. IDIOMA: Responde SIEMPRE en el mismo idioma en que el usuario te hable (Español, Inglés, Alemán, Italiano, Francés, etc.).
        2. FORMATO: Responde SIEMPRE con un objeto JSON puro (sin markdown).
        3. OBJETIVO: Extraer información para Citas, Facturas o Contabilidad.
        
        JSON Keys: 
        - 'intent': [book_appointment, create_invoice, log_expense, chat]
        - 'entities': {{"cliente": str, "monto": float, "fecha": str, "concepto": str}}
        - 'response_text': Tu respuesta amigable y profesional.
        """
        
        try:
            response = client.models.generate_content(
                model='gemini-2.0-flash-exp',
                contents=text,
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                    response_mime_type='application/json'
                )
            )
            return response.text
        except Exception as e:
            # Fallback en caso de error con el modelo experimental
            print(f"Error con Gemini 2.0: {e}")
            return json.dumps({
                "intent": "chat",
                "entities": {},
                "response_text": "Lo siento, tuve un problema técnico. ¿Puedes repetir?"
            })

    @staticmethod
    def get_rag_context(customer_id: str, query: str) -> str:
        return "El cliente prefiere citas por la mañana y es alérgico a la anestesia."

    @staticmethod
    def generate_invoice_pdf(transaction_data: Dict) -> str:
        return f"https://storage.bizmuth.com/invoices/{transaction_data.get('id')}.pdf"
