import { Scroll, Timer } from '@phosphor-icons/react';

import * as S from './styles';
import logoIgnite from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';
export function Header() {
	return (
		<S.HeaderContainer>
			<img
				src={logoIgnite}
				alt='Icone representando os projetos do ignite na cor verde'
				title='Icone representando os projetos do ignite na cor verde'
			/>
			<S.Nav>
				<NavLink to='/' title='timer pomodoro'>
					<Timer size={24} />
				</NavLink>
				<NavLink to='/history' title='histórico de timers'>
					<Scroll size={24} />
				</NavLink>
			</S.Nav>
		</S.HeaderContainer>
	);
}
