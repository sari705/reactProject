import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from "./app/store.js"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({  
  
  palette: {
    primary: {
      main: '#84B1D9',
    },
    secondary: {
      main: '#BF7069',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#590202',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Fredoka", "Arial", sans-serif',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
