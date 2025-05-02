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

const STATUS_COLORS = {
	yellow: 'yellow-500',
	green: 'green-500',
	red: 'red-500',
} as const;

interface StatusProps {
	statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
	display: flex;
	align-items: center;
	gap: 0.8rem;

	&::before {
		content: '';
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background-color: ${(props) =>
			props.theme[STATUS_COLORS[props.statusColor]]};
	}
`;
