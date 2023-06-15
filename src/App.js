import React from 'react';
import theme from "./theme";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { Paper, ThemeProvider } from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  app: {
    width: "100vw",
    // height: "100vh",
  }

});
function App() {
  const classes = useStyles();
  


  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.app}>

        <BrowserRouter>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </BrowserRouter>

      </Paper>
    </ThemeProvider>
  );
}

export default App;
