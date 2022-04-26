import React, { createContext } from 'react';
import GameStore, { createGameStore } from './gameStore';

export const GlobalStateContext = createContext<GameStore>(createGameStore());

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return <GlobalStateContext.Provider value={createGameStore()}>{children}</GlobalStateContext.Provider>;
}
