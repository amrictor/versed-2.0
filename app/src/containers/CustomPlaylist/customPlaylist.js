import React from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import PlayArrow from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';

import injectReducer from 'utils/redux/injectReducer';

import SongList from 'components/SongList';
import { setSource } from 'containers/ControlPanel/actions';

import useStyles from './styles';
import reducer from './reducer';
import makeSelectCustomPlaylist from './selectors';

const selectCustomPlaylist = makeSelectCustomPlaylist();

const CustomPlaylist = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { customPlaylist } = useSelector(selectCustomPlaylist);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>Custom Playlist</div>
        {customPlaylist.length > 0 && <IconButton size='small' onClick={() => dispatch(setSource(customPlaylist))}><PlayArrow/></IconButton>}
      </div>
      <div className={classes.playlist}>
        {customPlaylist.length > 0 
          ? <SongList tracks={customPlaylist} customPlaylist/> 
          : <div style={{padding: '30px 10px', fontSize: 14, textAlign: 'center'}}>Playlist is empty! Search for your favorite music or add songs from your Spotify playlists.</div>
        }
      </div>
    </div>
  );
}

const withReducer = injectReducer({ key: 'customPlaylist', reducer });

export default withReducer(CustomPlaylist);
