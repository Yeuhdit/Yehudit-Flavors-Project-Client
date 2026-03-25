// react-client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';  
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthProvider";
import { SnackbarProvider } from 'notistack';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
); 