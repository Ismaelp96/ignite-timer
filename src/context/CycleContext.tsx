import { createContext, ReactNode, useState, useReducer } from 'react';
interface createCycleData {
	minutesAmount: number;
	task: string;
}
interface Cycle {
	id: string;
	task: string;
	minutesAmout: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
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

interface CyclesState {
	cycles: Cycle[];
	activeCycleId: string | null;
}

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	const [cycleState, dispatch] = useReducer(
		(state: CyclesState, action: any) => {
			if (action.type === 'ADD_NEW_CYCLE') {
				return {
					...state,
					cycles: [...state.cycles, action.payload.newCycle],
					activeCycleId: action.payload.newCycle.id,
				};
			}
			if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
				return {
					...state,
					cycles: state.cycles.map((cycle) => {
						if (cycle.id === state.activeCycleId) {
							return { ...cycle, interruptedDate: new Date() };
						} else {
							return cycle;
						}
					}),
					activeCycleId: null,
				};
			}
			return state;
		},
		{
			cycles: [],
			activeCycleId: null,
		},
	);

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
			type: 'ADD_NEW_CYCLE',
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
			type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
			payload: {
				activeCycleId,
			},
		});
	}

	function interruptCurrentCycle() {
		dispatch({
			type: 'INTERRUPT_CURRENT_CYCLE',
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
