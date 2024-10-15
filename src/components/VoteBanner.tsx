'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCardStore } from '@/store';
import { motion } from 'framer-motion';
import { Vote } from 'lucide-react';

export const VoteBanner = () => {
    const { openMenu } = useCardStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg mx-4 my-8"
        >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 flex items-center">
                    <Vote className="w-12 h-12 mr-4" />
                    <div>
                        <h2 className="text-2xl font-bold mb-2">¡Tu opinión es importante!</h2>
                        <p className="text-lg">
                            Ayúdanos a elegir al mejor superhéroe votando ahora.
                        </p>
                    </div>
                </div>
                <Button
                    onClick={openMenu}
                    className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300 font-bold py-3 px-6 rounded-full text-lg"
                >
                    Votar Ahora
                </Button>
            </div>
        </motion.div>
    );
};
