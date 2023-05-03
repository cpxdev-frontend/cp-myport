import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import { Provider } from "react-redux";
import {
  BrowserRouter
} from "react-router-dom";
import store from './redux/store'

const theme = createTheme({
  typography: {
    fontFamily: 'anakotmai',
  },
  palette: {
    background: {
      default: "#e8e8e8"
    },
    secondary: {
      light: '#fff',
      main: '#1976d2',
      contrastText: '#fff',
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
    </Provider>
</BrowserRouter>
);

