'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from '@/hooks/useMediaQuery';

gsap.registerPlugin(useMediaQuery);

const url = process.env.NEXT_PUBLIC_VIDEO_URL || '';

export function MarvelVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const isSmallScreen = useMediaQuery('(min-width: 641px)');

    useEffect(() => {
        if (isSmallScreen && videoRef.current) {
            gsap.fromTo(
                videoRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
            );
            videoRef.current.play();
        }
    }, [isSmallScreen]);

    return (
        <div className="w-full h-screen flex items-center  px-4 justify-start ">
            {isSmallScreen && (
                <video
                    ref={videoRef}
                    className="video-container  w-full h-auto inset-0 rounded-lg shadow-2xl dark:shadow-amber-400 shadow-red-500"
                    playsInline
                    preload="auto"
                    loop
                >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}
