import { useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import * as S from './styles';
import { CyclesContext } from '../../context/CycleContext';

export function History() {
	const { cycles } = useContext(CyclesContext);
	return (
		<S.HistoryContainer>
			<h1>Meu histórico</h1>
			<S.HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cycles.map((cycle) => {
							return (
								<tr key={cycle.id}>
									<td>{cycle.task}</td>
									<td>{cycle.minutesAmout} minutos</td>
									<td>
										{formatDistanceToNow(new Date(cycle.startDate), {
											addSuffix: true,
											locale: ptBR,
										})}
									</td>
									<td>
										{cycle.finishedDate && (
											<S.Status statusColor='green'>Concluído</S.Status>
										)}
										{cycle.interruptedDate && (
											<S.Status statusColor='red'>Interrompido</S.Status>
										)}
										{!cycle.finishedDate && !cycle.interruptedDate && (
											<S.Status statusColor='yellow'>Em andamento</S.Status>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</S.HistoryList>
		</S.HistoryContainer>
	);
}
