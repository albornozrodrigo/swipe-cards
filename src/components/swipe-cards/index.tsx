"use client";

import { HeartIcon, UndoIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SwipeCardHandle, User } from "./interfaces";
import { NoUsers } from "./no-users";
import RippleLoader from "./ripple";
import SwipeCard from "./swipe-card";
import './swipe-cards.css';

interface InitialDataProps {
  usersList: User[];
}

export default function SwipeCards({
  usersList
}: InitialDataProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [discardedCards, setDiscardedCards] = useState<User[]>([]);
  const [cards, setCards] = useState<User[]>([]);
  const frontCardRef = useRef<SwipeCardHandle | null>(null);
  const lastSwipeTime = useRef<number>(0);

  const undo = useCallback(async () => {
    const last = [...discardedCards].at(-1);
  
    if (!last) return;
  
    setCards((cards) => [...cards, last]);
    setDiscardedCards((discardedCards) => discardedCards.slice(0, -1));
  }, [setCards, setDiscardedCards, discardedCards]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if(usersList) setCards(usersList);
    }, 3000);
  }, [usersList, setCards]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const actionMap: { [key: string]: () => void } = {
        ArrowLeft: () => frontCardRef.current?.swipe("left"),
        ArrowRight: () => frontCardRef.current?.swipe("right"),
        ArrowUp: undo,
      };

      const action = actionMap[e.key];
      if (action) action();
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo]);

  // Só atualiza o estado: quando isto roda o card já saiu da tela pela
  // própria animação (ver `flyOut` em swipe-card.tsx).
  const handleSwipe = useCallback((user: User) => {
    setCards((cards) => cards.filter((card) => card.id !== user.id));
    setDiscardedCards((discarded) => [...discarded, user]);
  }, []);

  // Handler otimizado para botões
  const handleButtonSwipe = useCallback((direction: "left" | "right") => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 300) return;

    lastSwipeTime.current = now;
    frontCardRef.current?.swipe(direction);
  }, []);

  const handleUndo = useCallback(() => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 300) return;

    lastSwipeTime.current = now;

    undo();
  }, [undo]);

  if (isLoading) {
    return <RippleLoader />;
  }

  if (!cards || cards.length === 0) {
    return <NoUsers />;
  }

  return (
    <div className="grid h-fit w-fit place-items-center">
      {cards.map((user, index) => {
        const isFront = index === cards.length - 1;

        return (
          <SwipeCard
            key={`${user.id}-${index}`}
            ref={isFront ? frontCardRef : null}
            user={user}
            index={index}
            isFront={isFront}
            onSwipe={handleSwipe}
          />
        );
      })}

      <div className="mb-4 flex items-center justify-evenly gap-8">
        <button
          onClick={() => handleButtonSwipe("left")}
          aria-label="Descartar"
          className="rounded-full bg-red-500 p-4 text-white cursor-pointer transition-all duration-300 hover:bg-red-400 touch-manipulation select-none"
        >
          <XIcon aria-hidden="true" />
        </button>

        <button
          onClick={handleUndo}
          aria-label="Desfazer"
          className="rounded-full bg-yellow-500 p-2.5 text-white cursor-pointer transition-all duration-300 hover:bg-yellow-400 touch-manipulation select-none"
        >
          <UndoIcon aria-hidden="true" />
        </button>

        <button
          onClick={() => handleButtonSwipe("right")}
          aria-label="Curtir"
          className="rounded-full bg-green-500 p-4 text-white cursor-pointer transition-all duration-300 hover:bg-green-400 touch-manipulation select-none"
        >
          <HeartIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
