'use client';
import { SuperheroAnterioresProps } from '@/interface';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SuperheroAnteriores({
    name,
    description,
    imageUrl,
    likes,
    unlikes,
}: SuperheroAnterioresProps) {
    const totalVotes = likes + unlikes;
    const likePercentage = totalVotes > 0 ? Math.round((likes / totalVotes) * 100) : 50;

    return (
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" className="z-0" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex justify-between items-end">
                    <div className="text-white ml-4">
                        <h3 className="text-xl font-bold mb-1">{name}</h3>
                        <p className="text-sm mb-2">{description}</p>
                    </div>
                    {likePercentage >= 50 ? (
                        <ThumbsUp className="text-green-500 w-8 h-8" />
                    ) : (
                        <ThumbsDown className="text-red-500 w-8 h-8" />
                    )}
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${likePercentage}%` }} />
                </div>
                <div className="flex justify-between text-xs text-white mt-1">
                    <span>{likes} Me gusta</span>
                    <span>{unlikes} No me gusta</span>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => console.log(`Ver detalles de ${name}`)}
                >
                    <Info className="w-4 h-4 mr-2" /> Ver detalles
                </Button>
            </div>
        </div>
    );
}
