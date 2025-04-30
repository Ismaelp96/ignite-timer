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
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
  }

  `;
