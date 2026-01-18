# Guía de Despliegue - NexoBot AI

Para publicar NexoBot y que sea accesible desde cualquier lugar del mundo, sigue estos pasos recomendados usando **Vercel** y una base de datos en la nube.

## 1. Base de Datos (Prioridad)
Vercel no permite usar SQLite de forma persistente. Debes crear una base de datos PostgreSQL.
- **Recomendación**: [Supabase](https://supabase.com) o [Neon.tech](https://neon.tech). Ambos tienen planes gratuitos.
- Una vez creada, obtén la **Connection String** (ej: `postgresql://user:password@host:5432/dbname`).

## 2. Publicar el Backend (FastAPI)
1. Conecta tu repositorio de GitHub a un nuevo proyecto en Vercel.
2. Selecciona la carpeta `backend`.
3. Configura las siguientes **Environment Variables**:
   - `DATABASE_URL`: Tu link de Supabase/Neon.
   - `GEMINI_API_KEY`: Tu clave de Google AI Studio.
   - `SECRET_KEY`: Una cadena aleatoria larga para la seguridad.
   - `BASE_URL`: El link que Vercel te asigne para el backend (ej: `https://nexobot-api.vercel.app`).
4. Despliega.

## 3. Publicar el Frontend (Next.js)
1. Crea otro proyecto en Vercel conectado al mismo repositorio.
2. Selecciona la carpeta `frontend`.
3. Configura las **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: El link de tu Backend (el que configuraste en el paso anterior).
4. Despliega.

## 4. Pruebas Finales
- Entra en el link de tu Frontend.
- Intenta registrarte. Si los datos se guardan, la conexión con la base de datos es correcta.
- Prueba el chat público con el link generado.

---
> [!TIP]
> Si necesitas ayuda configurando las variables en el dashboard de Vercel, dime y te daré instrucciones más detalladas paso a paso.
