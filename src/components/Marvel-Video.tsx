'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from '@/hooks/useMediaQuery';

gsap.registerPlugin(useMediaQuery);

const url_1 = process.env.NEXT_PUBLIC_VIDEO_URL || '';
const url_2 = process.env.NEXT_PUBLIC_VIDEO_URL_TWO || '';

const videoComics = [
    { id: 1, url: url_1, width: 640, height: 266 },
    { id: 2, url: url_2, width: 640, height: 360 },
];

export function MarvelVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery('(min-width: 641px)');
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

    useEffect(() => {
        if (isSmallScreen && videoRef.current) {
            gsap.fromTo(
                videoRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
            );
            videoRef.current.play().catch((error) => console.error('Error playing video:', error));
        }
    }, [isSmallScreen, currentVideoIndex]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleVideoEnd = () => {
                setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoComics.length);
            };
            videoElement.addEventListener('ended', handleVideoEnd);
            return () => {
                videoElement.removeEventListener('ended', handleVideoEnd);
            };
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch((error) => console.error('Error playing video:', error));
        }
    }, [currentVideoIndex]);

    return (
        <div
            ref={containerRef}
            className={`w-full ${
                isSmallScreen && 'h-[80vh]'
            } flex items-center justify-center overflow-hidden rounded-lg shadow-2xl dark:shadow-amber-400 shadow-red-500`}
        >
            {isSmallScreen && (
                <video
                    key={videoComics[currentVideoIndex].id}
                    ref={videoRef}
                    className="w-full h-full object-cover "
                    playsInline
                    preload="auto"
                    onEnded={() =>
                        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoComics.length)
                    }
                >
                    <source src={videoComics[currentVideoIndex].url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}
