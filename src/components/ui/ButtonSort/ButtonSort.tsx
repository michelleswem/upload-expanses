import React from 'react';
import { Expanse } from '../../../models/expanse';
import './ButtonSort.scss';

type SortOrder = 'asc' | 'dec';
type Data = Expanse[];
type SortKey = keyof Data[0];

export type SortButtonProps = {
  onClick: () => void;
  className?: string;
  sortOrder: SortOrder;
  columnKey: SortKey;
  sortKey: SortKey;
  type?: 'button' | 'submit';
  children?: React.ReactNode;
};

export const ButtonSort: React.FC<SortButtonProps> = ({
  children,
  onClick,
  sortOrder,
  columnKey,
  sortKey,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${
        sortKey === columnKey && sortOrder === 'dec' ? 'arrow-down' : 'arrow-up'
      }`}
    >
      {children}
    </button>
  );
};
