import * as zod from 'zod';
import { useContext } from 'react';
import { HandPalm, Play } from '@phosphor-icons/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';
import { CountDown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import { CyclesContext } from '../../context/CycleContext';

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo precisa ser de o minímo 5 minutos')
		.max(60, 'O clico precisa ser no máximo 60 minutos'),
});
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const { activeCycle, createNewCycle, interruptCurrentCycle } =
		useContext(CyclesContext);
	const newCycleForm = useForm<newCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	});
	const { handleSubmit, watch } = newCycleForm;

	const task = watch('task');
	const isSubmitDisabled = !task;

	return (
		<S.HomeContainer>
			<form onSubmit={handleSubmit(createNewCycle)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<CountDown />

				{activeCycle ? (
					<S.StopCountdownButton type='button' onClick={interruptCurrentCycle}>
						<HandPalm />
						Interromper
					</S.StopCountdownButton>
				) : (
					<S.StartCountdownButton type='submit' disabled={isSubmitDisabled}>
						<Play />
						Começar
					</S.StartCountdownButton>
				)}
			</form>
		</S.HomeContainer>
	);
}
