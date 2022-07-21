import React, { useState, useMemo, useContext } from 'react';
import { ExpansesSelect } from '../ExpansesSelect';
import { Expanse } from '../../../models/expanse';
import './ExpansesFilterTable.scss';
import { ExpanseContext } from '../../../store/expanses-context';

type Data = Expanse[];
type SelectKey = keyof Data[0];
const groupAndSumAmountBy = (
  field: SelectKey,
  items: Data,
): Record<string, number> => {
  return items.reduce((group, curItem) => {
    const fieldValue = curItem[field];
    if (!fieldValue) return group;
    group[fieldValue] = (group[fieldValue] || 0) + curItem.amount;
    return group;
  }, {} as Record<string, number>);
};

export const ExpansesFilterTable: React.FC = () => {
  const [filterExpanse, setFilterExpanse] = useState<SelectKey>('departments');
  const { items } = useContext(ExpanseContext);

  const filterChangeHandler = (select: SelectKey) => {
    setFilterExpanse(select);
  };

  const result = useMemo(
    () => groupAndSumAmountBy(filterExpanse, items),
    [filterExpanse, items],
  );

  const totalAmount = Object.values(result).reduce(
    (total, curAmount) => (total += curAmount),
  );

  return (
    <div>
      <ExpansesSelect onSelect={filterChangeHandler} value={filterExpanse} />
      <table>
        <thead>
          <tr className="row-btw">
            <th>{filterExpanse}</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(result).map((exp, index) => (
            <tr key={index} className="row-btw">
              <td>{exp[0]}</td>
              <td>{`${exp[1].toFixed(2)}€`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="total-amount">
        <span>Total</span>
        <span>{`${totalAmount.toFixed(2)}€`}</span>
      </p>
    </div>
  );
};
