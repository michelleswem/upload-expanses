import React from 'react';
import { Layout } from '../components/layout';
import { Expanses } from '../components/expanses/Expenses';
import expansesData from '../mocks/expansesData.json';

export const App: React.FC = () => {
	return (
		<Layout>
			<Expanses expanses={expansesData} />
		</Layout>
	);
};
