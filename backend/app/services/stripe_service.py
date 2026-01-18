import stripe
from app.core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY # Cargado desde el archivo .env

class StripeService:
    @staticmethod
    def create_checkout_session(customer_email: str, success_url: str, cancel_url: str, amount: float = 19.99):
        try:
            unit_amount = int(amount * 100) # De dólares a centavos
            checkout_session = stripe.checkout.Session.create(
                customer_email=customer_email,
                payment_method_types=['card'],
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'product_data': {
                                'name': 'NexoBot Premium Subscription',
                                'description': 'Full access to all NexoBot business features',
                            },
                            'unit_amount': unit_amount,
                        },
                        'quantity': 1,
                    },
                ],
                mode='subscription',
                success_url=success_url,
                cancel_url=cancel_url,
            )
            return checkout_session.url
        except Exception as e:
            print(f"Error Stripe: {e}")
            return None
