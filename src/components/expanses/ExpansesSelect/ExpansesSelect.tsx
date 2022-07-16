import React from 'react';
import { Expanse } from '../../../models/expanse';
import './ExpansesSelect.scss';
type Data = Expanse[];
type SelectKey = keyof Data[0];
export type SelectExpanseProp = {
	onSelect: (value: SelectKey) => void;
	value: SelectKey;
};

const selectValues: { key: SelectKey; label: string }[] = [
	{
		key: 'departments',
		label: 'Departments',
	},

	{
		key: 'projectName',
		label: 'ProjectName',
	},

	{
		key: 'date',
		label: 'Date',
	},
	{
		key: 'memberName',
		label: 'MemberName',
	},
];

export const ExpansesSelect: React.FC<SelectExpanseProp> = ({
	onSelect,
	value,
}) => {
	const selectExpansesHandler = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectFilter = event.target.value as SelectKey;
		onSelect(selectFilter);
	};
	return (
		<div className='expanses-filter'>
			<label className='expanses-filter__label'>Total Expanses by:</label>
			<select
				className='expanses-filter__select'
				value={value}
				onChange={selectExpansesHandler}>
				{selectValues.map((value) => (
					<option key={value.key} value={value.key}>
						{value.label}
					</option>
				))}
			</select>
		</div>
	);
};
