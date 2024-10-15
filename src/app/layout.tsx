import type { Metadata } from 'next';
import { ThemeProvider, Navbar } from '@/components';
import './globals.css';
import { oswald } from '@/conf';

interface LayoutProps {
    children: React.ReactNode;
}
type TemplateString = {
    template: string;
    default: string;
};

export const metadata: Metadata & { title: TemplateString } = {
    title: {
        template: '%s | SuperHeroes',
        default: 'SuperHeroes',
    },
    description:
        'Visita a tus superheroes favoritos , dales un like o mira los ultimos avances en el mundo comics, ademas de dar un me gusta al superheroe favorito',
    generator: 'Next.js 14',
    applicationName: 'Superheroes',
    category: 'blog',
    referrer: 'origin-when-cross-origin',
    keywords: ['Super heroes', 'comics', 'peliculas', 'marvel', 'dc comic', 'batman'],
    authors: [
        {
            name: 'Julian David Nunez Franco',
            url: 'https://github.com/juliandavidnunesfranco',
        },
    ],
    creator: 'Julian David Nunez',
    publisher: 'Julian David Nunez',
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
    robots: 'index, follow',
    openGraph: {
        title: 'SuperHeroes',
        description:
            'Visita a tus superheroes favoritos , dales un like o mira los ultimos avances en el mundo comics, ademas de dar un me gusta al superheroe favorito',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000', // Asegúrate de usar la URL base correcta
        siteName: 'SuperHeroes',
        images: '/favicon.png', // Ruta a una imagen representativa del sitio
        locale: 'es_CO',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image', // Muestra una imagen grande en las tarjetas de Twitter
        site: '@superheroes', // Tu cuenta de Twitter, si la tienes
        title: 'Superheroes',
        description:
            'Visita a tus superheroes favoritos , dales un like o mira los ultimos avances en el mundo comics, ademas de dar un me gusta al superheroe favorito',
        images: '/favicon.png', // Ruta a una imagen para Twitter
    },
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${oswald.className}  antialiased flex flex-col min-h-screen`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />

                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
