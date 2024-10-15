import {
    MarvelVideo,
    SuperheroAnteriores,
    SuperheroCard,
    SuperheroCarousel,
    VoteBanner,
    VoteProgressBar,
} from '@/components';
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

    const heroesToFind = ['batman', 'thor', 'spider-man', 'superman'];
    const superheroesAnteriores = superheroes.filter((hero) =>
        heroesToFind.includes(hero.name.toLowerCase())
    );
    const infoHero: IronmanProps = {
        hero: info[0]?.name || '',
        fullName: info[0]?.biography['full-name'] || '',
        placeOfBirth: info[0]?.biography['place-of-birth'] || '',
        firstAppearance: info[0]?.biography['first-appearance'] || '',
        publisher: info[0]?.biography['publisher'] || '',
        alignment: info[0]?.biography['alignment'] || '',
    };

    if (!superheroes.length || !infoHero.hero) notFound();

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
            <section aria-label="Votaciones anteriores">
                <div className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Superhéroes Populares Votaciones Anteriores
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {superheroesAnteriores.map((hero) => (
                            <SuperheroAnteriores
                                key={hero.name}
                                name={hero.name}
                                description={hero.biography['first-appearance']}
                                imageUrl={hero.image.url}
                                likes={65}
                                unlikes={45}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
