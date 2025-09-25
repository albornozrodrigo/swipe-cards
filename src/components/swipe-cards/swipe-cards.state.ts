import { create } from "zustand";
import type { SwipeProps, User } from "./interfaces";

export const useSwipeCardsState = create<SwipeProps>((set, get) => ({
  cards: [],
  discardedCards: [],
  setCards: (newCards: User[]) => set({ cards: newCards }),
  setDiscardedCards: (newCards: User[]) =>
    set({ discardedCards: newCards }),
  undo: () => {
    const last = get().discardedCards.at(-1);
    if (!last) return;

    set((state) => ({
      cards: [...state.cards, last],
      discardedCards: state.discardedCards.slice(0, -1),
    }));
  },
}));
