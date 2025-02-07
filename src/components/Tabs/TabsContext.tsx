'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface TabsContextProps {
  tabKey: string;
  setTabKey: Dispatch<SetStateAction<string>>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export const TabsContext = createContext({} as TabsContextProps);

interface TabsProviderProps {
  children: ReactNode;
}

export function TabsProvider({ children }: TabsProviderProps) {
  const [activeTab, setActiveTab] = useState('');
  const [tabKey, setTabKey] = useState('');

  return (
    <TabsContext.Provider
      value={{
        tabKey,
        setTabKey,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}
