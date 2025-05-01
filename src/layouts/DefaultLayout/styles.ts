import styled from 'styled-components';

export const LayoutContainer = styled.div`
	max-width: 112rem;
	height: calc(100vh - 8rem);
	margin: 8.2rem auto;
	padding: 3rem 4rem;
	background: ${({ theme }) => theme['gray-800']};
	border-radius: 8px;

	display: flex;
	flex-direction: column;
`;
