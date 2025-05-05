import styled from 'styled-components';

export const NewCycleFormContainer = styled.div`
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
