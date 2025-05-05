import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import * as S from './styles';
import { CycleContext } from '../..';

export function NewCycleForm() {
	const { register } = useFormContext();
	const { activeCycle } = useContext(CycleContext);

	return (
		<S.NewCycleFormContainer>
			<label htmlFor='task'>Vou trabalhar em</label>
			<S.TaskInput
				type='text'
				id='task'
				list='task-suggestions'
				placeholder='Dê um nome para o seu projeto'
				disabled={!!activeCycle}
				{...register('task')}
			/>
			<datalist id='task-suggestions'>
				<option value='Projeto 1' />
				<option value='Projeto 2' />
				<option value='Projeto 3' />
			</datalist>
			<label htmlFor='minutesAmount'>durante</label>
			<S.TaskMinutesAmountInput
				type='number'
				id='minutesAmount'
				placeholder='00'
				step={5}
				min={1}
				max={60}
				disabled={!!activeCycle}
				{...register('minutesAmount', { valueAsNumber: true })}
			/>
			<span>minutos</span>
		</S.NewCycleFormContainer>
	);
}
