import { createContext, ReactNode, useState, useReducer } from 'react';
import { ActionsTypes, Cycle, cyclesRuducer } from '../reducers/cycles';
interface createCycleData {
	minutesAmount: number;
	task: string;
}

interface CyclesContextType {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
	createNewCycle: (data: createCycleData) => void;
	interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
	children: ReactNode;
}

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	const [cycleState, dispatch] = useReducer(cyclesRuducer, {
		cycles: [],
		activeCycleId: null,
	});

	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const { activeCycleId, cycles } = cycleState;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	function createNewCycle(data: createCycleData) {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmout: data.minutesAmount,
			startDate: new Date(),
		};
		dispatch({
			type: ActionsTypes.ADD_NEW_CYCLE,
			payload: {
				newCycle,
			},
		});
		setAmountSecondsPassed(0);
	}

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}
	function markCurrentCycleAsFinished() {
		dispatch({
			type: ActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
			payload: {
				activeCycleId,
			},
		});
	}

	function interruptCurrentCycle() {
		dispatch({
			type: ActionsTypes.INTERRUPT_CURRENT_CYCLE,
			payload: { activeCycleId },
		});
	}

	return (
		<CyclesContext.Provider
			value={{
				activeCycle,
				activeCycleId,
				amountSecondsPassed,
				markCurrentCycleAsFinished,
				setSecondsPassed,
				createNewCycle,
				interruptCurrentCycle,
				cycles,
			}}>
			{children}
		</CyclesContext.Provider>
	);
}
