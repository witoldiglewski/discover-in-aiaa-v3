import { createContext, useContext, ReactNode } from 'react';

interface StepPartsContextValue {
  setHeader: (header: ReactNode) => void;
  setFooter: (footer: ReactNode) => void;
}

export const StepPartsContext = createContext<StepPartsContextValue | null>(null);

export function useStepParts() {
  const context = useContext(StepPartsContext);
  if (!context) {
    throw new Error('useStepParts must be used within StepLayout');
  }
  return context;
}
