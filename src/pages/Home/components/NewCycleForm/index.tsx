import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(1, 'O ciclo precisa ser de o minímo 5 minutos')
		.max(60, 'O clico precisa ser no máximo 60 minutos'),
});
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
export function NewCycleForm() {
	const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	});
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
