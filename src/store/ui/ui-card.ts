import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { immer } from 'zustand/middleware/immer';

interface State {
    isMenuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

export const useCardStore = create<State>()(
    persist(
        immer((set) => ({
            isMenuOpen: false,
            openMenu: () =>
                set((state) => {
                    state.isMenuOpen = true;
                }),
            closeMenu: () =>
                set((state) => {
                    state.isMenuOpen = false;
                }),
        })),
        { name: 'card-storage', storage: createJSONStorage(() => sessionStorage) }
    )
);
