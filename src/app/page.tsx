import { MarvelVideo, SuperheroCard, SuperheroCarousel, VoteBanner, VoteProgressBar } from '@/components';
import { IronmanProps, Superhero } from '@/interface';
import { fetchApiByPublisher, fetchApiWithParams } from '@/lib/fetch';
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
    const info = await fetchApiWithParams('ironman');

    const infoHero: IronmanProps = {
        hero: info[0].name,
        fullName: info[0].biography['full-name'],
        placeOfBirth: info[0].biography['place-of-birth'],
        firstAppearance: info[0].biography['first-appearance'],
        publisher: info[0].biography['publisher'],
        alignment: info[0].biography['alignment'],
    };

    if (!superheroes || !infoHero) notFound();

    return (
        <main className="w-full h-screen flex flex-col">
            <section className="relative hidden md:flex flex-1">
                <MarvelVideo />
            </section>
            <SuperheroCard superhero={infoHero} />
            <section className="relative flex md:hidden flex-1">
                <SuperheroCarousel superheroes={superheroes} />
            </section>
            <section aria-label="Progreso de la votación">
                <VoteProgressBar />
            </section>
            <section aria-label="Invitación a votar">
                <VoteBanner />
            </section>
        </main>
    );
}
