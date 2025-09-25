export interface User {
  id: string;
  name: string;
  description: string;
  photos: string[];
  age: number;
  distance: string;
  occupation: string;
  interests: string[];
}

export interface SwipeCardHandle {
  swipe: (direction: "left" | "right") => void;
}

export interface SwipeCardProps {
  index: number;
  user: User;
  onSwipe: (user: User, direction: "left" | "right") => Promise<void>;
}

export interface SwipeProps {
  cards: User[] | [];
  discardedCards: User[] | [];
  setCards: (cards: User[]) => void;
  setDiscardedCards: (cards: User[]) => void;
  undo: () => void;
}
