import styled from 'styled-components';

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
