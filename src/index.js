import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  BrowserRouter
} from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: 'anakotmai',
  },
  palette: {
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
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
</BrowserRouter>
);

