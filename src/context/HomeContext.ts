import { createContext, useContext, useState } from 'react';

export interface HomeContextType {
  count: number;
  setCount: (count: number) => void;
  name: string;
  setName: (name: string) => void;
}

export const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHomeValue = (): HomeContextType => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  return {
    count,
    setCount,
    name,
    setName
  };
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within HomeProvider');
  }
  return context;
};
