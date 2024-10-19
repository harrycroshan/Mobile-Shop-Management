import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider >
    <MainApp />   
    </GlobalProvider>
    
  </React.StrictMode>
);


