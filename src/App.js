import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme()

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Dashboard />
      </MuiThemeProvider>
    );
  }
}

export default App;
