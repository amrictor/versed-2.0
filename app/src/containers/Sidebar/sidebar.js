import React from 'react';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';

import useStyles from './styles';
import Navigation from './components/Navigation';
import SpotifyPlaylists from '../SpotifyPlaylists';
import CustomPlaylist from '../CustomPlaylist';

const Sidebar = ({ open, toggleOpen}) => {
  const classes = useStyles();
  return (      
    <div className={clsx(classes.root, open && classes.sidebarOpen)}>
      <div className={clsx(classes.sidebar, open && classes.sidebarOpen)}>
        <IconButton className={classes.toggleButton} onClick={toggleOpen}>
          {open ? <Close/> : <Menu/>}
        </IconButton>
        <div className={clsx(classes.content, open && classes.sidebarOpen)}>
          <Navigation/>
          <SpotifyPlaylists/>
          <CustomPlaylist/>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
