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

export const TitleContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1.1rem;
	flex-wrap: wrap;
	label,
	span,
	input {
		font-size: 1.8rem;
		font-weight: bold;
		color: ${({ theme }) => theme['gray-100']};
	}
`;

const BaseInput = styled.input`
	background: transparent;
	height: 4rem;
	padding: 1.1rem 0.8rem;
	border: 0;
	border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
	&:hover {
		box-shadow: none;
		border-color: ${({ theme }) => theme['green-500']};
	}
	&:focus {
		box-shadow: none;
		border-color: ${({ theme }) => theme['green-500']};
	}
	&::placeholder {
		color: ${({ theme }) => theme['gray-500']};
	}
`;

export const TaskInput = styled(BaseInput)`
	flex: 1;
	&::-webkit-calendar-picker-indicator {
		display: none !important;
	}
`;
export const TaskMinutesAmountInput = styled(BaseInput)`
	width: 100%;
	max-width: 6.6rem;
`;

export const CountDownContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1.6rem;
	font-family: 'Roboto Mono', monospace;
	font-weight: bold;
	font-size: 16rem;
	line-height: 13rem;
	color: ${({ theme }) => theme['gray-100']};
	span {
		background: ${({ theme }) => theme['gray-700']};
		padding: 4rem 1.6rem;
		border-radius: 8px;
	}
`;

export const Seperator = styled.div`
	color: ${({ theme }) => theme['green-500']};
	width: 5.7rem;
	overflow: hidden;
	display: flex;
	justify-content: center;
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
