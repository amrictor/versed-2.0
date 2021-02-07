import React from 'react';

import Settings from '@material-ui/icons/Settings';
import Search from '@material-ui/icons/Search';
import Home from '@material-ui/icons/Home';

import LinkButton from 'components/LinkButton';

import useStyles from './styles';

const Navigation = () => {
  const classes = useStyles();

  return (   
    <div className={classes.root}>
      <LinkButton 
        fullWidth 
        className={classes.navButton}
        to='/'
      >
        <Home/> Home
      </LinkButton>
      <LinkButton 
        fullWidth 
        className={classes.navButton}
        to='/search'
      >
        <Search/> Search
      </LinkButton>
      <LinkButton 
        fullWidth 
        className={classes.navButton}
        to='/settings'
      >
        <Settings/> Settings
      </LinkButton>
    </div>
  );
}

export default Navigation;
