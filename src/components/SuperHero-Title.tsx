'use client';
import { starShieldFontSans } from '@/conf';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export function SuperheroTitle() {
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (titleRef.current) {
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

                gsap.fromTo(
                    titleElement.children,
                    { y: -100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 3, stagger: 0.07, ease: 'bounce.out' }
                );
            }
        }
    }, []);

    return (
        <>
            <div ref={titleRef}>
                <h1
                    className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-200 ${starShieldFontSans.className} antialiased mb-3`}
                    style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
                >
                    SUPERHEROES
                </h1>
            </div>
        </>
    );
}
