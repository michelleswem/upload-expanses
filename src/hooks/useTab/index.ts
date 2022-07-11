import { useState } from 'react';

export const useTab = (id: string) => {
	const [activeTab, setActiveTab] = useState(id);

	const changeTabHandler = (value: string) => {
		setActiveTab(value);
	};
	return { activeTab, changeTabHandler };
};
