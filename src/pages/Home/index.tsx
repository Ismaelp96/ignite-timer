import { Play } from '@phosphor-icons/react';
import * as S from './styles';

export function Home() {
	return (
		<S.HomeContainer>
			<S.FormContainer>
				<S.Title>
					<label htmlFor='task'>Vou trabalhar em</label>
					<input
						type='text'
						id='task'
						placeholder='Dê um nome para o seu projeto'
					/>
					<label htmlFor='minutesAmount'>durante</label>
					<input type='number' id='minutesAmount' placeholder='- 00 +' />
					<span>minutos</span>
				</S.Title>
				<S.CountDownContainer>
					<span>0</span>
					<span>0</span>
					<S.Seperator>:</S.Seperator>
					<span>0</span>
					<span>0</span>
				</S.CountDownContainer>
				<button type='submit'>
					<Play />
					Começar
				</button>
			</S.FormContainer>
		</S.HomeContainer>
	);
}
