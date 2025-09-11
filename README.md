```markdown
# pedbox

## ENVIRONMENT VARIABLES
En el directorio **/backend** crea un archivo `.env` con el siguiente contenido:

```env
# Base de datos local SQLite
DATABASE_URL="file:./dev.db"
```

### Instalar dependencias y levantar servidor local
```bash
cd backend
npm install
npm run dev
```

## BACKEND INSTRUCTIONS: Si se añaden campos en el schema.prisma usar
```bash
npx prisma migrate dev --name add-more-fields
npx prisma generate
```
### Para actualizar la Database desde el back (ejecutar en /backend):
```bash
npm run fetch:reddits
```

## FRONTEND INSTRUCTIONS:
```bash
cd frontend
npm install
npm run dev
```

## Ejecutar pruebas unitarias
```bash
npm run test
npm run test:ui
npm run test:watch
```

