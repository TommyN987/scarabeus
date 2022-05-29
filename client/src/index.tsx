import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { AuthContextProvider } from './contexts/AuthContext';
import { theme } from './styles/custom-theme';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </BrowserRouter>
);