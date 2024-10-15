import { CounterState } from '@/interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useCounterStore = create<CounterState>()(
    persist(
        immer((set) => ({
            like: 0,
            unlike: 0,
            sumar: (value: number, voteType: string) =>
                set((state) => {
                    if (voteType === 'like') {
                        state.like += value;
                    } else {
                        state.unlike += value;
                    }
                }),
        })),
        {
            name: 'counter-storage',
        }
    )
);
