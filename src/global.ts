import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
html {
  font-size: 62.5%;
}

@media (max-width: 768px) {
  html {
    font-size: 55%;
  }
}

  body {
    background: ${(props) => props.theme['gray-900']};
    color: ${({ theme }) => theme['gray-300']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']};
  }

  button {
    border: 0;
    cursor: pointer;
  }

  input:-webkit-autofill {
		box-shadow: 0 0 0px 1000px transparent inset;
		-webkit-box-shadow: 0 0 0px 1000px transparent inset;
		-webkit-text-fill-color: ${({ theme }) => theme['gray-100']};
		transition: background-color 5000s ease-in-out 0s;
	
  }
  `;
