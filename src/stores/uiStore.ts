import { create } from 'zustand';

interface UIState {
  menuOpen: boolean;
  messagesOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setMessagesOpen: (open: boolean) => void;
  toggleMenu: () => void;
  toggleMessages: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  menuOpen: false,
  messagesOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  setMessagesOpen: (open) => set({ messagesOpen: open }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  toggleMessages: () => set((s) => ({ messagesOpen: !s.messagesOpen })),
}));
