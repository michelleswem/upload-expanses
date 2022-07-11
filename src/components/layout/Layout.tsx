import React from 'react';
import { Props } from '../../models/props';
import './Layout.scss';

export const Layout: React.FC<Props> = ({ children }) => {
	return <div className='container'>{children}</div>;
};
