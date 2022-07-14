import React, { useState, useMemo } from 'react';
import { ExpansesSelect } from '../ExpansesSelect';
import { Expanse } from '../../../models/expanse';
import './ExpansesFilterTable.scss';
type Data = Expanse[];
type SelectKey = keyof Data[0];
type ExpansesFilterProps = {
	expanses: Expanse[];
};
const groupAndSumAmountBy = (
	field: SelectKey,
	items: Data
): Record<string, number> => {
	return items.reduce((group, curItem) => {
		let fieldValue = curItem[field];
		if (!fieldValue) return group;
		group[fieldValue] = (group[fieldValue] || 0) + curItem.amount;
		return group;
	}, {} as Record<string, number>);
};

export const ExpansesFilterTable: React.FC<ExpansesFilterProps> = ({
	expanses,
}) => {
	const [filterExpanse, setFilterExpanse] = useState<SelectKey>('departments');

	const filterChangeHandler = (select: SelectKey) => {
		setFilterExpanse(select);
	};

	const result = useMemo(
		() => groupAndSumAmountBy(filterExpanse, expanses),
		[filterExpanse, expanses]
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
				<span>Total</span>
				<span>{`${totalAmount.toFixed(2)}€`}</span>
			</p>
		</div>
	);
};
