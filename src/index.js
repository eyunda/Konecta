import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const theme = createTheme({
  palette: {
    primary: {
      main: '#27aae1',
    },
    secondary: {
      main: '#169ab2',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
      <ToastContainer autoClose={4000} position="top-right" style={{ width: "auto", fontSize: "20px" }} />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
