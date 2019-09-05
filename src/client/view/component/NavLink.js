import React from 'react';
import { NavLink as ReactNavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const AdapterLink = React.forwardRef(
  (props, ref) => <ReactNavLink innerRef={ref} {...props} />
);

const activeStyle = {
  color: 'red',
}

export default ({to, children}) => {

  return(
    <Link underline='none' component={AdapterLink} to={to} activeStyle={activeStyle}>
      {children}
    </Link>
  )
};
