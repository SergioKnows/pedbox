/* 
Usar en consola: npm run import:reddits
Asegurarse estar en la ruta /backend antes de ejecutar el comando.
Permite importar los datos de los subreddits a la base de datos. 
*/
import { importRedditData } from "../services/importRedditData.js";

async function main() {
    const total = await importRedditData();
    console.log(`✅ Datos Importados/actualizados: ${total}`);
}

main()
    .catch(e => {
        console.error("❌ Error:", e);
        process.exit(1);
    })
