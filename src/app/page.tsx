import { SuperheroCarousel } from '@/components';
import { Superhero } from '@/interface';
import { fetchApiByPublisher } from '@/lib/fetch';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const superheroes: Superhero[] = await fetchApiByPublisher();
    return superheroes.map((hero) => ({
        id: hero.id,
    }));
}

export default async function Home({ params }: { params: { id: string } }) {
    const { id } = params;
    console.log('ID', id);
    const superheroes: Superhero[] = await fetchApiByPublisher();
    if (!superheroes) notFound();
    return (
        <main className="w-full h-screen">
            <SuperheroCarousel superheroes={superheroes} />
        </main>
    );
}
