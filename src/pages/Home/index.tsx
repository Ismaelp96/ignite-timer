import { Play } from '@phosphor-icons/react';
import * as S from './styles';

export function Home() {
	return (
		<S.HomeContainer>
			<form>
				<S.TitleContainer>
					<label htmlFor='task'>Vou trabalhar em</label>
					<S.TaskInput
						type='text'
						id='task'
						placeholder='Dê um nome para o seu projeto'
					/>
					<label htmlFor='minutesAmount'>durante</label>
					<S.TaskMinutesAmountInput
						type='number'
						id='minutesAmount'
						placeholder='- 00 +'
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
				<S.StartCountdownButton type='submit'>
					<Play />
					Começar
				</S.StartCountdownButton>
			</form>
		</S.HomeContainer>
	);
}
