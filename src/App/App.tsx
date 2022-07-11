import React from 'react';
import { Layout } from '../components/layout';
import { ExpanseContextProvider } from '../store/expanses-context';
import { Expanses } from '../components/expanses/Expenses';

export const App: React.FC = () => {
	return (
		<ExpanseContextProvider>
			<Layout>
				<Expanses />
			</Layout>
		</ExpanseContextProvider>
	);
};
