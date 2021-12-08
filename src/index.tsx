import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import { Wallet } from './components/wallet/Wallet'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4e44ce',
    },
    text: {
      primary: '#fff',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Wallet />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
