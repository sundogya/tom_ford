import { createContext, useContext, useState } from 'react';
import type { SubTab } from '@/components/CateContent';

interface CateTab {
  id: string | number;
  title: string;
  subTabs: SubTab[];
  [key: string]: unknown;
}

export interface IndexContextType {
  cateTabs?: CateTab[];
  setCateTabs: (cateTabs: CateTab[]) => void;
  name: string;
  setName: (name: string) => void;
  cartCount: number;
  setCartCount: (count: number) => void;
}

export type { CateTab };
export const IndexContext = createContext<IndexContextType | undefined>(undefined);

export const useIndexValue = (): IndexContextType => {
  const [cateTabs, setCateTabs] = useState<CateTab[]>([]);
  const [name, setName] = useState('');
  const [cartCount, setCartCount] = useState<number>(3);

  return {
    cateTabs,
    setCateTabs,
    name,
    setName,
    cartCount,
    setCartCount,
  };
};

export const useIndexContext = () => {
  const context = useContext(IndexContext);
  if (!context) {
    throw new Error('useIndexContext must be used within IndexProvider');
  }
  return context;
};
