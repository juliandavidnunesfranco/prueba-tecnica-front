'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SuperheroTitle } from '@/components';

export function MarvelVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery('(max-width: 640px)');

    useEffect(() => {
        if (isSmallScreen && videoRef.current) {
            gsap.fromTo(
                videoRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
            );
            videoRef.current.play();
        } else if (!isSmallScreen && titleRef.current) {
            const titleElement = titleRef.current.querySelector('h1');
            if (titleElement) {
                const letters = titleElement.textContent?.split('') || [];
                titleElement.innerHTML = '';
                letters.forEach((letter) => {
                    const span = document.createElement('span');
                    span.textContent = letter;
                    span.style.display = 'inline-block';
                    titleElement.appendChild(span);
                });

                // gsap.set(titleRef.current, { overflow: 'hidden' });
                gsap.fromTo(
                    titleElement.children,
                    { y: -100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'bounce.out' }
                );
            }
        }
    }, [isSmallScreen]);

    return (
        <div className="w-full h-screen flex items-center  px-4 justify-start bg-gradient-to-b from-indigo-700 to-transparent">
            {isSmallScreen ? (
                <video
                    ref={videoRef}
                    className="video-container  w-full h-auto inset-0 rounded-lg shadow-2xl shadow-amber-400"
                    playsInline
                    preload="auto"
                    loop
                >
                    <source
                        src="https://res.cloudinary.com/ddlcmyrof/video/upload/v1728773196/Marvel_Opening_Theme_rjg2v9.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div ref={titleRef}>
                    <SuperheroTitle />
                </div>
            )}
        </div>
    );
}
