import React from 'react'
import ReactDOM from "react-dom"
import Home from './pages/home'
import "./global.less"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Home />
  </ThemeProvider>, 
  document.getElementById('root')
)