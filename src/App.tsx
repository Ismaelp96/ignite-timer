import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { defaultTheme } from './styles/themes/defaut';
import { GlobalStyle } from './global';
import { Router } from './Router';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	);
}

export default App;
