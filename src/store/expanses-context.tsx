import React, { useState } from 'react';
import { Expanse } from '../models/expanse';
import expansesData from '../mocks/expansesData.json';
import { Props } from '../models/props';

export type ExpanseContextProps = {
	items: Expanse[];
};

export const ExpanseContext = React.createContext<ExpanseContextProps>({
	items: expansesData,
});

export const ExpanseContextProvider: React.FC<Props> = ({ children }) => {
	const [expanses] = useState<Expanse[]>(expansesData);

	const contextValue: ExpanseContextProps = {
		items: expanses,
	};

	return (
		<ExpanseContext.Provider value={contextValue}>
			{children}
		</ExpanseContext.Provider>
	);
};
