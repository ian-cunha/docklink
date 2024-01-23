import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: #242424;
  background-color: rgba(255, 255, 255, 0.87);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: gray;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #535BF2 inset;
}
  
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  overflow-x: hidden;
}

::selection {
    background-color: transparent;
    color: none;
}

`;

export default GlobalStyle;