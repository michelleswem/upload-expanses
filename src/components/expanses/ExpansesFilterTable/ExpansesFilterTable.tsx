import React, { useContext, useState, useMemo } from 'react';
import { ExpanseContext } from '../../../store/expanses-context';
import { ExpansesSelect } from '../ExpansesSelect';
import { Expanse } from '../../../models/expanse';
import './ExpansesFilterTable.scss';

type Data = Expanse[];
type SelectKey = keyof Data[0];

let groupAndSumAmountBy = (field: SelectKey, items: Data) => {
	return items.reduce((group, curItem) => {
		let fieldValue = curItem[field];
		if (!fieldValue) return group;
		group[fieldValue] = (group[fieldValue] || 0) + curItem.amount;
		return group;
	}, {} as Record<string, number>);
};

export const ExpansesFilterTable: React.FC = () => {
	const expCtx = useContext(ExpanseContext);

	const [filterExpanse, setFilterExpanse] = useState<SelectKey>('departments');

	const filterChangeHandler = (select: SelectKey) => {
		setFilterExpanse(select);
	};

	const result = useMemo(
		() => groupAndSumAmountBy(filterExpanse, expCtx.items),
		[filterExpanse, expCtx]
	);

	const totalAmount = Object.values(result).reduce(
		(total, curAmount) => (total += curAmount)
	);

	return (
		<div>
			<ExpansesSelect onSelect={filterChangeHandler} value={filterExpanse} />
			<table>
				<thead>
					<tr className='row-btw'>
						<th>{filterExpanse}</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(result).map((exp, index) => (
						<tr key={index} className='row-btw'>
							<td>{exp[0]}</td>
							<td>{`${exp[1].toFixed(2)}€`}</td>
						</tr>
					))}
				</tbody>
			</table>
			<p className='total-amount'>
				<span>Total:</span>
				<span>{`${totalAmount.toFixed(2)}€`}</span>
			</p>
		</div>
	);
};
