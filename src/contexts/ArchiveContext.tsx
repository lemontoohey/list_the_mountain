"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ArchiveContextValue = {
  isEntered: boolean;
  setEntered: (value: boolean) => void;
};

const ArchiveContext = createContext<ArchiveContextValue | null>(null);

export function ArchiveProvider({ children }: { children: ReactNode }) {
  const [isEntered, setIsEntered] = useState(false);
  const setEntered = useCallback((value: boolean) => setIsEntered(value), []);
  return (
    <ArchiveContext.Provider value={{ isEntered, setEntered }}>
      {children}
    </ArchiveContext.Provider>
  );
}

export function useArchive() {
  const ctx = useContext(ArchiveContext);
  if (!ctx) return { isEntered: false, setEntered: () => {} };
  return ctx;
}
