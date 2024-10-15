import fs from 'fs';
import path from 'path';

export function handlerDataJson(hero: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const filePath = path.join(process.cwd(), `src/data/heroes-anteriores/${hero}.json`);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(new Error('Error al leer el archivo JSON'));
                return;
            }

            try {
                const jsonData = JSON.parse(data);
                resolve({
                    statusCode: 200,
                    body: jsonData,
                    message: 'Archivo JSON cargado correctamente',
                });

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (parseError) {
                reject(new Error('Error al parsear el archivo JSON'));
            }
        });
    });
}

export async function handlerheroLast() {
    const heroesToFind = ['batman', 'thor', 'spider-man', 'superman'];

    try {
        const promis = heroesToFind.map(async (hero) => {
            const data = await handlerDataJson(hero);
            return data;
        });
        const result = await Promise.all(promis);

        return result;
    } catch (error) {
        console.error('Error al leer los archivos JSON:', error);
        return [];
    }
    
}
