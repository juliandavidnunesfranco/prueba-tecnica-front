'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { SuperheroTitle } from './SuperHero-Title';
import { Search } from 'lucide-react';
import { useUIStore } from '@/store';
import { ModeToggle } from './ModeToggle';
import { comic_neue } from '@/conf';

export const Navbar = () => {
    const openMenu = useUIStore((state) => state.openMenu);
    const isMenuOpen = useUIStore((state) => state.isMenuOpen);
    const closeMenu = useUIStore((state) => state.closeMenu);

    return (
        <>
            {isMenuOpen && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                    aria-hidden
                />
            )}
            {isMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    aria-hidden
                />
            )}
            <nav className="fixed top-0 left-0 px-10  flex flex-row justify-between items-center w-full h-20 bg-transparent z-30 ">
                <Link href={'/'} className="hidden md:flex flex-1">
                    <SuperheroTitle />
                </Link>
                <div>
                    <div className={`items-center gap-4 hidden md:flex ${comic_neue.className} text-xl font-semibold`}>
                        <Link href={'/heroes'}>Heroes Anteriores</Link>
                        <Link href={'/how'}>¿Còmo Funciona?</Link>
                        <Link href={'/login'}>Iniciar Sesión</Link>
                        <Link href={'/search'}>
                            <Button className="m-2 p-2 rounded-md transition-all" variant={'ghost'}>
                                <Search size={30} />
                            </Button>
                        </Link>
                        <ModeToggle />
                    </div>

                    <Button
                        onClick={openMenu}
                        className="md:hidden flex-1 bg-transparent"
                        variant={'ghost'}
                    >
                        {' '}
                        <SuperheroTitle />
                    </Button>
                </div>
                {isMenuOpen && (
                    <div className="absolute top-16 left-10 bg-white text-black shadow-lg rounded-md p-4 z-10 md:hidden">
                        <Link href={'/heroes'} className="block mb-2">
                            Heroes Anteriores
                        </Link>
                        <Link href={'/how'} className="block mb-2">
                            ¿Cómo Funciona?
                        </Link>
                        <Link href={'/login'} className="block mb-2">
                            Iniciar Sesión
                        </Link>
                        <Link href={'/search'} className="block">
                            <Button className="m-2 p-2 rounded-md transition-all" variant={'ghost'}>
                                <Search size={30} />
                            </Button>
                        </Link>

                        <Button onClick={closeMenu} variant={'ghost'}>
                            Cerrar
                        </Button>
                    </div>
                )}
            </nav>
        </>
    );
};
