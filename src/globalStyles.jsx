import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: #242424;
  background-color: #2D3376;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: gray;
  
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
}

input:-webkit-autofill {
    -webkit-text-fill-color: black !important;
}

input {
  caret-color: #535BF2;
}
  
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  overflow-x: hidden;
}

::selection {
    background-color: #535BF2;
    color: white;
}

.loader {
  position: relative;
  width: 64px;
  height: 60px;
}
.loader::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  background: #fff;
  width: 64px;
  height: 32px;
  border-radius: 0 0 50px 50px;
  animation: move 0.5s linear infinite alternate;
}
.loader::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  background: #535BF2;
  width: 24px;
  height: 24px;
  transform: translateX(-50%) rotate(0deg);
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  100% { transform: translateX(-50%) rotate(360deg)}
}
@keyframes move {
  0% { transform: rotate(10deg)}
  100% { transform: rotate(-10deg)}
}
      

`;

export default GlobalStyle;