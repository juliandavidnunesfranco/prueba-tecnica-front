'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Superhero } from '@/interface';
import { starShieldFontSans } from '@/conf';

interface SuperheroCarouselProps {
    superheroes: Superhero[];
}

export function SuperheroCarousel({ superheroes }: SuperheroCarouselProps) {
    
    const carouselRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (carouselRef.current) {
            const slides = slideRefs.current;
            const totalSlides = slides.length;
            let currentSlide = 0;

            const animateSlide = (index: number) => {
                const slide = slides[index];
                if (slide) {
                    gsap.to(slide, { opacity: 1, duration: 1, ease: 'power3.out' });
                    const title = slide.querySelector('.superhero-title');
                    if (title) {
                        gsap.fromTo(
                            title,
                            { opacity: 0, y: 50 },
                            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
                        );
                    }
                }
            };

            const hideSlide = (index: number) => {
                gsap.to(slides[index], { opacity: 0, duration: 1, ease: 'power3.out' });
            };

            const nextSlide = () => {
                hideSlide(currentSlide);
                currentSlide = (currentSlide + 1) % totalSlides;
                animateSlide(currentSlide);
            };

            // Initial setup
            slides.forEach((slide, index) => {
                if (slide) {
                    gsap.set(slide, { opacity: index === 0 ? 1 : 0 });
                }
            });
            animateSlide(0);

            // Start the automatic rotation
            const interval = setInterval(nextSlide, 6000); // Change slide every 6 seconds

            return () => clearInterval(interval);
        }
    }, [superheroes]);

    const handleImageError = (heroId: string) => {
        setImageErrors((prev) => ({ ...prev, [heroId]: true }));
    };

    return (
        <>
            {!superheroes ? (
                <div className="flex h-screen items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="h-screen w-full overflow-hidden " ref={carouselRef}>
                    {superheroes.map((hero, index) => (
                        <div
                            key={hero.id}
                            ref={(el) => {
                                slideRefs.current[index] = el;
                            }}
                            className="absolute inset-0 h-full w-full flex items-center px-4 justify-center transition-transform duration-500 transform"
                        >
                            <div
                                className="carousel-container relative overflow-hidden rounded-3xl shadow-2xl shadow-red-500 dark:shadow-amber-400 transition-shadow duration-300 "
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '80vh',
                                    aspectRatio: '1/1',
                                }}
                            >
                                {!imageErrors[hero.id] && (
                                    <Image
                                        src={hero.image.url}
                                        alt={hero.name}
                                        onError={() => handleImageError(hero.id)}
                                        priority
                                        fill
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-transparent opacity-50 transition-opacity duration-500 hover:opacity-100" />
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-4">
                                    <h2
                                        className={`superhero-title ${starShieldFontSans.className} antialiased text-6xl text-slate-200 font-bold  mb-2 transition-transform duration-500 transform hover:translate-y-2`}
                                        style={{
                                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)',
                                        }}
                                    >
                                        {hero.name}
                                    </h2>
                                    <p
                                        className="text-2xl text-white transition-transform duration-500 transform hover:translate-y-1"
                                        style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
                                    >
                                        {hero.biography.publisher}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
