import {
	createContext,
	ReactNode,
	useState,
	useReducer,
	useEffect,
} from 'react';
import { Cycle, cyclesRuducer } from '../reducers/cycles/reducer';
import {
	addNewCycleAction,
	interrupetCurrentCycleAction,
	markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';
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
	const [cycleState, dispatch] = useReducer(
		cyclesRuducer,
		{
			cycles: [],
			activeCycleId: null,
		},
		(initialState) => {
			const storedStateAsJSON = localStorage.getItem(
				'@ignite-time:cycles-state-1.0.0',
			);
			if (storedStateAsJSON) {
				return JSON.parse(storedStateAsJSON);
			}
			return initialState;
		},
	);
	const { activeCycleId, cycles } = cycleState;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
		if (activeCycle) {
			return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
		}
		return 0;
	});

	useEffect(() => {
		const stateJSON = JSON.stringify(cycleState);
		localStorage.setItem('@ignite-time:cycles-state-1.0.0', stateJSON);
	}, [cycleState]);

	function createNewCycle(data: createCycleData) {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmout: data.minutesAmount,
			startDate: new Date(),
		};
		dispatch(addNewCycleAction(newCycle));
		setAmountSecondsPassed(0);
	}

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}
	function markCurrentCycleAsFinished() {
		dispatch(markCurrentCycleAsFinishedAction());
	}

	function interruptCurrentCycle() {
		dispatch(interrupetCurrentCycleAction());
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
