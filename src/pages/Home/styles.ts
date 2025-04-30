import styled from 'styled-components';

export const HomeContainer = styled.main`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const FormContainer = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 5.6rem;
`;

export const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1.6rem;
	flex-wrap: wrap;
	label,
	span {
		font-size: 1.8rem;
		font-weight: bold;
	}
	input {
		color: ${({ theme }) => theme['gray-500']};
		background: transparent;
		border: none;
		border-bottom: 1px solid ${({ theme }) => theme['gray-500']};
		font-size: 1.8rem;
		&::placeholder {
			color: ${({ theme }) => theme['gray-500']};
			background: transparent;
			border-bottom: 1px solid ${({ theme }) => theme['gray-500']};
			font-size: 1.8rem;
		}
	}
`;

export const CountDownContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;
	font-family: 'Roboto Mono', monospace;
	font-size: 16rem;
	line-height: 14rem;
	color: ${({ theme }) => theme['gray-100']};

	span {
		background: ${({ theme }) => theme['gray-700']};
		padding: 2rem 1rem;
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
