import styled from 'styled-components';

export const HeaderContainer = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Nav = styled.nav`
	display: flex;
	align-items: center;
	gap: 0.8rem;

	a {
		width: 4.8rem;
		height: 4.8rem;

		display: flex;
		align-items: center;
		justify-content: center;
		color: ${({ theme }) => theme['gray-100']};
		border-bottom: 3px solid transparent;
		border-top: 3px solid transparent;
		transition: border-color 0.2s ease;
		&:hover {
			border-bottom-color: ${({ theme }) => theme['green-500']};
		}
		&.active {
			color: ${({ theme }) => theme['green-500']};
		}
	}
`;
