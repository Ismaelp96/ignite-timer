import { useForm } from 'react-hook-form';
import { differenceInSeconds } from 'date-fns';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { HandPalm, Play } from '@phosphor-icons/react';

import * as S from './styles';

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(1, 'O ciclo precisa ser de o minímo 5 minutos')
		.max(60, 'O clico precisa ser no máximo 60 minutos'),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
	id: string;
	task: string;
	minutesAmout: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	});

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

	const minutesAmout = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;

	const minutes = String(minutesAmout).padStart(2, '0');
	const seconds = String(secondsAmount).padStart(2, '0');

	useEffect(() => {
		let interval: number;
		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					activeCycle.startDate,
				);
				if (secondsDifference >= totalSeconds) {
					setCycles((state) =>
						state.map((cycle) => {
							if (cycle.id === activeCycleId) {
								return { ...cycle, finishedDate: new Date() };
							} else {
								return cycle;
							}
						}),
					);
					setAmountSecondsPassed(totalSeconds);
					clearInterval(interval);
				} else {
					setAmountSecondsPassed(secondsDifference);
				}
			}, 1000);
		}
		return () => {
			clearInterval(interval);
		};
	}, [activeCycle, activeCycleId, totalSeconds]);

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

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`;
		}
	}, [minutes, seconds, activeCycle]);

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
						disabled={!!activeCycle}
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
						min={1}
						max={60}
						disabled={!!activeCycle}
						{...register('minutesAmount', { valueAsNumber: true })}
					/>
					<span>minutos</span>
				</S.TitleContainer>
				<S.CountDownContainer>
					<span>{minutes[0]}</span>
					<span>{minutes[1]}</span>
					<S.Seperator>:</S.Seperator>
					<span>{seconds[0]}</span>
					<span>{seconds[1]}</span>
				</S.CountDownContainer>
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
