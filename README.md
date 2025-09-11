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
- Si se añaden campos en el schema.prisma usar (ejecutar en /backend)
```bash
npx prisma migrate dev --name add-more-fields
npx prisma generate
```
- Actualizar la Database (ejecutar en /backend)
```bash
npm run fetch:reddits
```
- Borrar datos de la Database (ejecutar en /backend)
```bash
npx prisma migrate reset
```
- Visualizar Database en interfaz web (ejecutar en /backend)
```bash
npx prisma studio
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