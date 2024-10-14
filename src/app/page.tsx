import { MarvelVideo, SuperheroCard, SuperheroCarousel } from '@/components';
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
        <main className="w-full h-screen flex flex-col">
            <section className="relative hidden md:flex flex-1">
                <MarvelVideo />
            </section>
            <section className="absolute top-20 left-24  flex-1">
                <SuperheroCard />
            </section>

            <section className="relative flex md:hidden flex-1">
                <SuperheroCarousel superheroes={superheroes} />
            </section>
        </main>
    );
}
