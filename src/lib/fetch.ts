import { Superhero } from '@/interface';
import { cache } from 'react';

export async function fetchApi(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function fetchApiWithParams(params: string) {
    const token = process.env.TOKEN_API || '';
    const api = process.env.SUPERHEROAPI_BASE_URL || '';

    const apiBaseUrl = `${api}${token}`;

    const url = `${apiBaseUrl}/search/`;
    const response = await fetch(`${url}${params}`);
    const data = await response.json();
    return data;
}

export async function fetchApiByImage(hero: Superhero): Promise<string> {
    const token = process.env.TOKEN_API || '';
    const api = process.env.SUPERHEROAPI_BASE_URL || '';
    const url = `${api}${token}/${hero.id}/image`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error(`Error fetching image for hero ID ${hero.id}:`, error);
        throw new Error(`Error fetching image for hero ID ${hero.id}: ${error}`);
    }
}

export const fetchApiByPublisher = cache(async (maxConcurrency = 5): Promise<Superhero[]> => {
    const token = process.env.TOKEN_API || '';
    const api = process.env.SUPERHEROAPI_BASE_URL || '';
    const validPublishers = ['Marvel Comics', 'DC Comics'];
    const maxSuperheroId = 731;
    const ids = Array.from({ length: maxSuperheroId }, (_, i) => i + 1);
    let results: Superhero[] = [];

    async function processBatch(batch: number[]): Promise<void> {
        const promises: Promise<Superhero | null>[] = batch.map(async (id) => {
            const url = `${api}${token}/${id}`;
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (validPublishers.includes(data.biography.publisher)) {
                    return data as Superhero;
                    //const imageUrl = await fetchApiByImage(data); // Llamar a fetchApiByImage
                    //return { ...data, imageUrl }; // Agregar imageUrl al objeto del superhéroe
                }
                return null; // Si no es válido, retorna null
            } catch (error) {
                console.error(`Error fetching superhero ID ${id}:`, error);
                throw new Error(`Error fetching superhero ID ${id}: ${error}`);
            }
        });

        const batchResults = await Promise.all(promises);
        results = results.concat(batchResults.filter((hero): hero is Superhero => hero !== null));
    }

    // Bucle para procesar las solicitudes en grupos con un límite de concurrencia
    for (let i = 0; i < ids.length; i += maxConcurrency) {
        const batch = ids.slice(i, i + maxConcurrency); // Selecciona un grupo de IDs
        await processBatch(batch); // Procesa este batch antes de continuar con el siguiente
    }

    return results;
});
