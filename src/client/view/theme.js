import React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const lineColors = [
  '#0ebeff',
  '#47cf73',
  '#ae63e4',
  '#fcd000',
  '#ff3c41',
  '#76daff',
]


export default createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  graph: {
    main: '#0ebeff',
    lineColors: index => lineColors[index % lineColors.length],
  }
});

