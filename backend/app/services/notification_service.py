from typing import Dict
import os
import requests

class NotificationService:
    @staticmethod
    def send_whatsapp_alert(phone: str, message: str):
        """
        Simulación de envío de alerta por WhatsApp/SMS.
        En producción, aquí se integraría Twilio, Meta Business API o similar.
        """
        print(f"🚀 [NOTIFICACIÓN] Enviando WhatsApp a {phone}: {message}")
        
        # Ejemplo de estructura para Twilio (comentado por seguridad)
        # account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        # auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        # if account_sid and auth_token:
        #     # Lógica de envío real
        #     pass
        
        return True

    @staticmethod
    def notify_appointment(tenant_name: str, tenant_phone: str, customer_name: str, details: Dict):
        """
        Envía un aviso específico de nueva cita al dueño del negocio con formato premium.
        """
        msg = f"🌟 *NEXOBOT INTELLIGENTE* | Nueva Cita Agendada\n\n"
        msg += f"🏢 *Negocio*: {tenant_name}\n"
        msg += f"👤 *Cliente*: {customer_name}\n"
        msg += f"🛠️ *Servicio*: {details.get('servicios', 'Gestión de cita')}\n"
        msg += f"💰 *Monto Est.*: ${details.get('total', 'A confirmar')}\n\n"
        msg += f"⚡ _La cita ha sido registrada automáticamente en tu agenda._\n"
        msg += f"👉 *Acción*: Revisa tu panel para más detalles."
        
        return NotificationService.send_whatsapp_alert(tenant_phone, msg)

    @staticmethod
    def notify_request(tenant_name: str, tenant_phone: str, customer_name: str, request_type: str):
        """
        Envía un aviso de una solicitud general con formato profesional.
        """
        msg = f"📥 *NEXOBOT ALERTA* | Solicitud de Documento\n\n"
        msg += f"📝 *Tipo*: {request_type}\n"
        msg += f"👤 *Solicitante*: {customer_name}\n"
        msg += f"🏢 *Negocio*: {tenant_name}\n\n"
        msg += f"✅ _El documento ha sido generado y entregado al cliente al instante._\n"
        msg += f"🔗 *Estado*: Disponible en tu historial de documentos."
        
        return NotificationService.send_whatsapp_alert(tenant_phone, msg)

    @staticmethod
    def notify_low_stock(tenant_name: str, tenant_phone: str, item_name: str, remaining_stock: int):
        """
        Envía una alerta de stock bajo al dueño del negocio.
        """
        msg = f"⚠️ *NEXOBOT ALERTA* | Inventario Bajo\n\n"
        msg += f"📦 *Producto*: {item_name}\n"
        msg += f"📉 *Stock Restante*: {remaining_stock} unidades\n"
        msg += f"🏢 *Negocio*: {tenant_name}\n\n"
        msg += f"🚩 _Atención: Este producto se está agotando. Considera reponer el stock pronto._"
        
        return NotificationService.send_whatsapp_alert(tenant_phone, msg)
