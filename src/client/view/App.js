import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';

import theme from './theme';
import SakePage from './SakePage';
import FilePage from './FilePage';
import NavLink from './component/NavLink';

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
}

export function App() {

  return (
    <BrowserRouter basename='/userCodeAppPanel'>
      <Container>

        <Box display='flex' borderColor='grey.200' border={2} p={2} my={2} textAlign='center'>
          <Box flexGrow={1}>
            <NavLink to='/Sake'>Sake</NavLink>
          </Box>
          <Box flexGrow={1}>
            <NavLink to='/File'>File</NavLink>
          </Box>
        </Box>

        <Switch>
          <Redirect exact from='/' to='/Sake' />
          <Route exact path='/Sake' component={SakePage}/>
          <Route       path='/File' component={FilePage}/>
        </Switch>

      </Container>
    </BrowserRouter>
  );
};
