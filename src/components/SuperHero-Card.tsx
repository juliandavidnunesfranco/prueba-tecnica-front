'use client';

import React, { useEffect } from 'react';
import { useCardStore } from '@/store';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { anton, starShieldFontSans } from '@/conf';

export interface IronmanProps {
    hero: string;
    fullName: string;
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
}

export function SuperheroCard({ superhero }: { superhero: IronmanProps }) {
    const { isMenuOpen, closeMenu, openMenu } = useCardStore();
    const { hero, fullName, placeOfBirth, firstAppearance, publisher, alignment } = superhero;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isMenuOpen) {
                openMenu();
            }
        }, 68000);
        return () => clearTimeout(timer);
    }, []);

    const handleVote = (vote: 'like' | 'unlike') => {
        // Aquí puedes implementar la lógica para manejar los votos
        console.log(`Voted ${vote} for ${hero}`);
        closeMenu();
    };

    return (
        <div>
            <Dialog open={isMenuOpen} onOpenChange={closeMenu}>
                <DialogContent className="max-w-[80%] py-10 md:max-w-md mx-auto bg-blend-lighten rounded-xl bg-white/10">
                    <DialogHeader>
                        <DialogTitle
                            className={`${starShieldFontSans.className} text-6xl text-center`}
                        >
                            {hero.toUpperCase()}
                        </DialogTitle>
                        <DialogDescription
                            className={`${anton.className} text-xl font-semibold text-center text-black`}
                        >
                            Danos tu opinión sobre este superhéroe.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 ">
                        <InfoItem label="Nombre completo" value={fullName} />
                        <InfoItem label="Lugar de nacimiento" value={placeOfBirth} />
                        <InfoItem label="Primera aparición" value={firstAppearance} />
                        <InfoItem label="Editorial" value={publisher} />
                        <InfoItem label="Alineación" value={alignment} />
                    </div>
                    <DialogFooter className="justify-center gap-2">
                        <Button
                            onClick={() => handleVote('like')}
                            variant="outline"
                            className="gap-1"
                        >
                            <ThumbsUp size={18} /> Me gusta
                        </Button>
                        <Button
                            onClick={() => handleVote('unlike')}
                            variant="outline"
                            className=" gap-1"
                        >
                            <ThumbsDown size={18} /> No me gusta
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="">
                                Cerrar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col space-y-1">
            <span className="text-md font-medium text-slate-900">{label}</span>
            <span className="text-lg font-semibold">{value}</span>
        </div>
    );
}
