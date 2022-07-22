import React, { useMemo, useState } from 'react';
import { Expanse } from '../models/expanse';
import expansesData from '../data/expansesData.json';

export type ExpanseContextProps = {
  items: Expanse[];
};

export const ExpanseContext = React.createContext<ExpanseContextProps>({
  items: expansesData,
});

type ExpanseProviderProps = {
  children?: React.ReactNode;
};
export const ExpanseContextProvider: React.FC<ExpanseProviderProps> = ({
  children,
}) => {
  const [expanses] = useState<Expanse[]>(expansesData);

  const contextValue: ExpanseContextProps = {
    items: expanses,
  };

  const contextData = useMemo(() => {
    return contextValue;
  }, [expanses]);

  return (
    <ExpanseContext.Provider value={contextData}>
      {children}
    </ExpanseContext.Provider>
  );
};
