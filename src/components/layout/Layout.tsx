import React from 'react';
import './Layout.scss';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};
