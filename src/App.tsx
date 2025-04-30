import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/defaut';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<h1>Estou usando o styled-components</h1>
		</ThemeProvider>
	);
}

export default App;
