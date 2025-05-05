import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { defaultTheme } from './styles/themes/defaut';
import { GlobalStyle } from './global';
import { Router } from './Router';
import { CyclesContextProvider } from './context/CycleContext';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<CyclesContextProvider>
					<Router />
				</CyclesContextProvider>
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	);
}

export default App;
