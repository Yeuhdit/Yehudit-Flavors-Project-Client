// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { heIL } from '@mui/material/locale';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: { main: '#d35400' },
    background: { default: '#fdf6f0' }
  },
  typography: { fontFamily: '"Heebo", sans-serif' }
}, heIL);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <App />
    </SnackbarProvider>
  </ThemeProvider>
);