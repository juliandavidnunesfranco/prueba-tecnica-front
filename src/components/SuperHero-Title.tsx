import { starShieldFontSans } from '@/conf';

export function SuperheroTitle() {
    return (
        <>
            <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-200 ${starShieldFontSans.className} antialiased mb-3`}
                style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
            >
                SUPERHEROES
            </h1>
        </>
    );
}
