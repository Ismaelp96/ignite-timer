import * as zod from 'zod';
import { createContext, useState } from 'react';
import { HandPalm, Play } from '@phosphor-icons/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';
import { CountDown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';

interface Cycle {
	id: string;
	task: string;
	minutesAmout: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CyclesContextType {
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
}

export const CycleContext = createContext({} as CyclesContextType);

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(1, 'O ciclo precisa ser de o minímo 5 minutos')
		.max(60, 'O clico precisa ser no máximo 60 minutos'),
});
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const newCycleForm = useForm<newCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	});
	const { handleSubmit, reset, watch } = newCycleForm;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}

	function markCurrentCycleAsFinished() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, finishedDate: new Date() };
				} else {
					return cycle;
				}
			}),
		);
	}

	function handleCreateNewCycle(data: newCycleFormData) {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmout: data.minutesAmount,
			startDate: new Date(),
		};
		setCycles((state) => [...state, newCycle]);
		setActiveCycleId(id);
		setAmountSecondsPassed(0);
		reset();
	}

	function handleInterruptCycle() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				} else {
					return cycle;
				}
			}),
		);
		setActiveCycleId(null);
	}

	const task = watch('task');
	const isSubmitDisabled = !task;

	return (
		<S.HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<CycleContext.Provider
					value={{
						activeCycle,
						activeCycleId,
						markCurrentCycleAsFinished,
						amountSecondsPassed,
						setSecondsPassed,
					}}>
					<FormProvider {...newCycleForm}>
						<NewCycleForm />
					</FormProvider>
					<CountDown />
				</CycleContext.Provider>
				{activeCycle ? (
					<S.StopCountdownButton type='button' onClick={handleInterruptCycle}>
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
