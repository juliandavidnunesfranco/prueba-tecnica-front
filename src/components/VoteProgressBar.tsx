'use client';

import React from 'react';
import { useCounterStore } from '@/store';
import Image from 'next/image';
import { starShieldFontSans } from '@/conf';

export function VoteProgressBar() {
    const { like, unlike } = useCounterStore();

    const totalVotes = like + unlike;
    const likePercentage = totalVotes > 0 ? Math.round((like / totalVotes) * 100) : 50;
    const unlikePercentage = 100 - likePercentage;

    return (
        <div className="w-full mx-auto mt-8 px-10 bg-transparent ">
            <header>
                <h2
                    className={`text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-200 ${starShieldFontSans.className} antialiased mb-3`}
                    style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
                >
                    Votacion en vivo
                </h2>
                <div className="my-2 flex items-center">
                    <Image
                        src="/assets/images/ironman-face.jpg"
                        alt="Iron Man"
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-lg "
                    />
                    <p
                        className={`ml-6 text-2xl font-bold ${starShieldFontSans.className} text-slate-200`}
                    >
                        IRONMAN
                    </p>
                </div>
            </header>
            <div className="relative h-20 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-green-500 flex items-center justify-end pr-2 text-white font-bold"
                    style={{ width: `${likePercentage}%` }}
                >
                    {likePercentage > 10 && `${likePercentage}%`}
                </div>
                <div
                    className="absolute top-0 right-0 h-full bg-red-500 flex items-center justify-start pl-2 text-white font-bold"
                    style={{ width: `${unlikePercentage}%` }}
                >
                    {unlikePercentage > 10 && `${unlikePercentage}%`}
                </div>
            </div>

            <div className="mt-4 flex justify-between text-sm">
                <span className="text-green-500 font-bold">{like} Me gusta</span>
                <span className="text-red-500 font-bold">{unlike} No me gusta</span>
            </div>
        </div>
    );
}
