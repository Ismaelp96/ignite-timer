import { createContext, useEffect, useState } from 'react';
import { HandPalm, Play } from '@phosphor-icons/react';

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
	markCurrentCycleAsFinished: () => void;
}

export const CycleContext = createContext({} as CyclesContextType);

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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
					value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
					<NewCycleForm />
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
