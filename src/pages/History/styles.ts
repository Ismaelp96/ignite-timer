import styled from 'styled-components';

export const HistoryContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 5rem;
	gap: 3.2rem;
	h1 {
		font-size: 2.4rem;
		color: ${({ theme }) => theme['gray-100']};
	}
`;

export const HistoryList = styled.div`
	overflow: auto;
	flex: 1;

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 60rem;

		overflow: hidden;
		th,
		td {
			background-color: ${({ theme }) => theme['gray-600']};
			padding: 1.6rem 2.4rem;
			text-align: left;
			font-size: 1.4rem;
			line-height: 160%;
			&:first-child {
				width: 50%;
			}
		}
		th {
			color: ${({ theme }) => theme['gray-100']};
			&:first-child {
				border-top-left-radius: 8px;
			}
			&:last-child {
				border-top-right-radius: 8px;
			}
		}
		td {
			border-top: 2px solid ${({ theme }) => theme['gray-800']};
			color: ${({ theme }) => theme['gray-300']};
		}
	}
`;
