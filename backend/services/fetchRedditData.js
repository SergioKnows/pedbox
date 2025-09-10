import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const URL = "https://www.reddit.com/reddits.json";
const UA = "pedbox-tech-test/1.0 (by pedboxUser)";

// Obtiene los datos de los subreddits desde Reddit y los guarda en la base de datos.
export async function fetchRedditData() {

    try {
        // 1) Descargar datos desde la API de Reddit
        const { data } = await axios.get(URL, { headers: { "User-Agent": UA } });
        // 2) Transformar cada item con mapItem y filtrar los que tengan displayName válido
        const items = (data?.data?.children ?? []).map(mapItem).filter(x => x.displayName);
        // 3) Insertar/actualizar cada item en la base de datos
        for (const x of items) {
            await prisma.redditData.upsert({
                where: { displayName: x.displayName },
                update: x,
                create: x,
            });
        }
        return items.length;
    }
    finally {
        await prisma.$disconnect();   // 👈 se cierra aquí
    }
}

// Mapea los datos de los subreddits de Reddit a la base de datos.
function mapItem(i) {
    const d = i?.data ?? {};
    return {
        displayName: d.display_name,
        title: d.title ?? null,
        subscribers: d.subscribers ?? null,
        over18: d.over18 ?? d.over_18 ?? null,
        createdAt: d.created_utc ? new Date(d.created_utc * 1000) : null,
        iconImg: d.icon_img ?? null,
        url: d.url ?? null,
        publicDescription: d.public_description ?? null,
        lang: d.lang ?? null,
        bannerImg: d.banner_img ?? null,
    };
}
