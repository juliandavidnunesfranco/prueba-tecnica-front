'use client';
import { useCardStore, useCounterStore } from '@/store';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from './ui/dialog';

import { Button } from './ui/button';
import { anton, starShieldFontSans } from '@/conf';
import { CardVotedProps } from '@/interface';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export const CardVoted = ({ voteType }: CardVotedProps) => {
    const { like, unlike } = useCounterStore();
    const { isCardOpen, closeCard } = useCardStore();

    return (
        <>
            <div>
                <Dialog open={isCardOpen} onOpenChange={closeCard}>
                    <DialogContent className="max-w-[80%] py-10 md:max-w-md mx-auto bg-blend-lighten rounded-xl bg-white/10">
                        <DialogHeader>
                            <DialogTitle
                                className={`${starShieldFontSans.className} text-4xl sm:text-6xl text-center`}
                            >
                                {voteType === 'like' ? 'Me gusta' : 'No me gusta'}
                            </DialogTitle>
                            <DialogDescription
                                className={`${anton.className} text-xl font-semibold text-center text-black`}
                            >
                                Gracias por tu voto ha sido registrado. Puedes votar nuevamente si lo deseas.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-2">
                            {voteType === 'like' ? (
                                <ThumbsUp size={100} className="text-green-500" />
                            ) : (
                                <ThumbsDown size={100} className="text-red-500" />
                            )}
                            <p className="text-2xl font-bold">
                                {voteType === 'like' ? `${like} Me gusta` : `${unlike} No me gusta`}
                            </p>
                        </div>
                        <DialogFooter className="justify-center gap-2">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" onClick={closeCard}>
                                    Volver
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};
