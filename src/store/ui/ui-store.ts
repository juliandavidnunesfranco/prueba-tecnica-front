import { create } from 'zustand';

interface State {
    isMenuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isMenuOpen: false,
    openMenu: () => set({ isMenuOpen: true }),
    closeMenu: () => set({ isMenuOpen: false }),
}));
