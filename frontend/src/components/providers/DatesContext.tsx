import React, { createContext, useContext, useState, ReactNode } from 'react';

type DateContextType = {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  nbDays: number;
  calculateNbDays: () => void;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [nbDays, setNbDays] = useState<number>(0);

  const calculateNbDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nbDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNbDays(nbDays);
  };

  return (
    <DateContext.Provider
      value={{ startDate, endDate, setStartDate, setEndDate, nbDays, calculateNbDays }}
    >
      {children}
    </DateContext.Provider>
  );
};

const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};

export { DateProvider, useDate };
