import styled from 'styled-components';

export const HomeContainer = styled.main`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		gap: 5.6rem;
		width: 100%;
		max-width: 65.6rem;
	}
`;

const baseCountdownButton = styled.button`
	width: 100%;
	padding-block: 2rem;
	border-radius: 8px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.8rem;
	font-weight: 500;
	color: ${({ theme }) => theme['gray-100']};
	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;

export const StartCountdownButton = styled(baseCountdownButton)`
	background-color: ${({ theme }) => theme['green-500']};
	transition: background-color 0.2s ease;
	&:not(:disabled):hover {
		background-color: ${({ theme }) => theme['green-700']};
	}
`;

export const StopCountdownButton = styled(baseCountdownButton)`
	background-color: ${({ theme }) => theme['red-500']};
	transition: background-color 0.2s ease;
	&:not(:disabled):hover {
		background-color: ${({ theme }) => theme['red-700']};
	}
`;
