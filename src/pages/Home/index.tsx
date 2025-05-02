import { useForm } from 'react-hook-form';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from '@phosphor-icons/react';

import * as S from './styles';

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutsAmout: zod
		.number()
		.min(5, 'O ciclo precisa ser de o minímo 5 minutos')
		.max(60, 'O clico precisa ser no máximo 60 minutos'),
});

export function Home() {
	const { register, handleSubmit, watch, formState } = useForm({
		resolver: zodResolver(newCycleFormValidationSchema),
	});

	function handleCreateNewCycle(data: any) {
		console.log(data);
	}

	const task = watch('task');
	const isSubmitDisabled = !task;
	return (
		<S.HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<S.TitleContainer>
					<label htmlFor='task'>Vou trabalhar em</label>
					<S.TaskInput
						type='text'
						id='task'
						list='task-suggestions'
						placeholder='Dê um nome para o seu projeto'
						{...register('task')}
					/>
					<datalist id='task-suggestions'>
						<option value='Porjeto 1' />
						<option value='Porjeto 2' />
						<option value='Porjeto 3' />
					</datalist>
					<label htmlFor='minutesAmount'>durante</label>
					<S.TaskMinutesAmountInput
						type='number'
						id='minutesAmount'
						placeholder='00'
						step={5}
						min={5}
						max={60}
						{...register('minutesAmount', { valueAsNumber: true })}
					/>
					<span>minutos</span>
				</S.TitleContainer>
				<S.CountDownContainer>
					<span>0</span>
					<span>0</span>
					<S.Seperator>:</S.Seperator>
					<span>0</span>
					<span>0</span>
				</S.CountDownContainer>
				<S.StartCountdownButton type='submit' disabled={isSubmitDisabled}>
					<Play />
					Começar
				</S.StartCountdownButton>
			</form>
		</S.HomeContainer>
	);
}
