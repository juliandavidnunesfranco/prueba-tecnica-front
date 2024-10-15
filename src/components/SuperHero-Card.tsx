'use client';
import React, { useEffect, useState } from 'react';
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
import { IronmanProps } from '@/interface';
import { useCounterStore } from '@/store';
import { CardVoted } from './CardVoted';

export function SuperheroCard({ superhero }: { superhero: IronmanProps }) {
    const { isMenuOpen, closeMenu, openMenu, openCard } = useCardStore();
    const { like, unlike, sumar } = useCounterStore();
    const { hero, fullName, placeOfBirth, firstAppearance, publisher, alignment } = superhero;
    const [meGusta, setMeGusta] = useState<number>(0);
    const [noMeGusta, setNoMeGusta] = useState<number>(0);
    const [currentVoted, setCurrentVoted] = useState<'like' | 'unlike' | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isMenuOpen) {
                openMenu();
            }
        }, 60000);
        return () => clearTimeout(timer);
    }, []);

    const viewLogs = (voteType: 'like' | 'unlike') => {
        console.log(
            '1-Voto desde estado global',
            voteType === 'like' ? `${like} x Like` : `${unlike} x Unlike`
        );
        console.log(
            '2-Voto desde estado local ',
            voteType === 'like' ? `${meGusta} x Like` : `${noMeGusta} x Unlike`
        );
        const storage =
            typeof window !== 'undefined' ? window.localStorage.getItem('counter-storage') : null;
        if (storage) {
            const { state } = JSON.parse(storage);
            console.log(
                '3-Voto desde LocalStorage',
                voteType === 'like' ? `${state.like} x Like` : `${state.unlike} x Unlike`
            );
        }
    };

    const handleVote = (voteType: 'like' | 'unlike') => {
        if (voteType === 'like') {
            setMeGusta((prevMeGusta) => prevMeGusta + 1);
        } else {
            setNoMeGusta((prevNoMeGusta) => prevNoMeGusta + 1);
        }
        //voteType === 'like' ? setMeGusta(meGusta + 1) : setNoMeGusta(noMeGusta + 1)
        sumar(1, voteType);
        setCurrentVoted(voteType);
        openCard();
        viewLogs(voteType);
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
            {currentVoted && <CardVoted voteType={currentVoted} />}
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
