# PEDBOX - Prueba Tecnica

## VARIABLES DE ENTORNO:
- En el directorio **/backend** crea un archivo `.env` con el siguiente contenido:
```bash
DATABASE_URL="file:./dev.db"
```
## INSTRUCCIONES BACKEND:
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
- Para actualizar la Database desde el back (ejecutar en /backend):
```bash
npm run fetch:reddits
```

## INSTRUCCIONES FRONTEND:
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