# PEDBOX - Prueba Tecnica

## VARIABLES DE ENTORNO:
- En el directorio **/backend** crea un archivo `.env` con el siguiente contenido:
```bash
PORT= 3000
DATABASE_URL="file:./dev.db"
JWT_EXPIRES_IN="1h"
BCRYPT_ROUNDS="10"
JWT_SECRET=$2a$12$IbwQFO/I0sRAPDtgdtNpDOwlCutzAqzJlJUiYYndHcJN7wJWIMTEW
```
## INSTRUCCIONES BACKEND: Ejecutar en /backend
- Instalar dependencias y levantar servidor local
```bash
cd backend
npm install
npm run dev
```
- Si se añaden campos en el schema.prisma usar
```bash
npx prisma migrate dev --name add-more-fields
npx prisma generate
```
- Actualizar la Database
```bash
npm run fetch:reddits
```
- Borrar datos de la Database
```bash
npx prisma migrate reset
```
- Visualizar Database en interfaz web
```bash
npx prisma studio
```

## SISTEMA DE LOGIN: Ejecutar en /backend con servidor levantado
- Crear usuario: Repuesta esperada, "id": 1, "email": "test@demo.com"
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","password":"clave123"}'
```
- Logear usuario: Repuesta esperada, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","password":"clave123"}'
```

## INSTRUCCIONES FRONTEND: Ejecutar en /frontend
```bash
cd frontend
npm install
npm run dev
```

## EJECUTAR PRUEBAS UNITARIAS:
- Sea la ruta, /backend o /frontend
```bash
npm run test
npm run test:ui
```