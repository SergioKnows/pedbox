/* 
Usar en consola: npm run fetch:reddits
Asegurarse estar en la ruta /backend antes de ejecutar el comando.
Permite obtener los datos de los subreddits desde Reddit y guardarlos en la base de datos. 
*/
import { fetchRedditData } from "../services/fetchRedditData.js";

async function main() {
    const total = await fetchRedditData();
    console.log(`✅ Datos obtenidos y guardados: ${total}`);
}

main()
    .catch(e => {
        console.error("❌ Error:", e);
        process.exit(1);
    })
