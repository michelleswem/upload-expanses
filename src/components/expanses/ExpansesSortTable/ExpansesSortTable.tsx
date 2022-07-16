import React, { useContext, useMemo, useState } from 'react';
import { ButtonSort } from '../../ui/ButtonSort';
import { ArrowIcon } from '../../../assets/icons/ArrowIcon';
import { Expanse } from '../../../models/expanse';
import { ExpanseContext } from '../../../store/expanses-context';

type SortOrder = 'asc' | 'dec';
type Data = Expanse[];
type SortKey = keyof Data[0];
const allHeaders: { key: SortKey; label: string }[] = [
	{
		key: 'departments',
		label: 'Department',
	},

	{
		key: 'projectName',
		label: 'Project Name',
	},
	{
		key: 'amount',
		label: 'Amount',
	},
	{
		key: 'date',
		label: 'Date',
	},
	{
		key: 'memberName',
		label: 'Name',
	},
];
const sortExpanses = (
	expenseData: Data,
	sortKeys: SortKey,
	ascending: boolean
) => {
	return expenseData.sort((a, b) => {
		if (ascending) {
			return a[sortKeys] > b[sortKeys] ? 1 : -1;
		} else {
			return a[sortKeys] < b[sortKeys] ? 1 : -1;
		}
	});
};
export const ExpansesSortTable: React.FC = () => {
	const [sortKey, setSortKey] = useState<SortKey>('id');

	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const { items } = useContext(ExpanseContext);

	const isAscending = sortOrder === 'asc';

	const sortedData = useMemo(() => {
		return sortExpanses(items, sortKey, isAscending);
	}, [items, sortKey, isAscending]);

	const sortExpansesHandler = (header: SortKey) => {
		setSortOrder(sortOrder === 'asc' ? 'dec' : 'asc');
		setSortKey(header);
	};

	return (
		<table>
			<thead>
				<tr>
					{allHeaders.map((header) => (
						<th key={header.key}>
							{header.label}
							<ButtonSort
								onClick={() => sortExpansesHandler(header.key)}
								type='button'
								sortOrder={sortOrder}
								sortKey={sortKey}
								columnKey={header.key}>
								<ArrowIcon />
							</ButtonSort>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{sortedData.map((item) => (
					<tr key={item.id} id={item.id}>
						<td>{item.departments}</td>
						<td>{item.projectName}</td>
						<td>{`${item.amount.toFixed(2)}€`}</td>
						<td>{item.date}</td>
						<td>{item.memberName}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
