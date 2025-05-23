import { useContext, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

import * as S from './styles';
import { CyclesContext } from '../../../../context/CycleContext';

export function CountDown() {
	const {
		activeCycle,
		activeCycleId,
		markCurrentCycleAsFinished,
		amountSecondsPassed,
		setSecondsPassed,
	} = useContext(CyclesContext);

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
					new Date(activeCycle.startDate),
				);
				if (secondsDifference >= totalSeconds) {
					markCurrentCycleAsFinished();
					setSecondsPassed(totalSeconds);
					clearInterval(interval);
				} else {
					setSecondsPassed(secondsDifference);
				}
			}, 1000);
		}
		return () => {
			clearInterval(interval);
		};
	}, [
		activeCycle,
		activeCycleId,
		totalSeconds,
		markCurrentCycleAsFinished,
		setSecondsPassed,
	]);

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`;
		} else {
			document.title = 'Ignite Timer';
		}
	}, [minutes, seconds, activeCycle]);

	return (
		<S.CountDownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<S.Seperator>:</S.Seperator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</S.CountDownContainer>
	);
}
