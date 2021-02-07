import React, { useEffect } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { setSeed, setPlayOnLoad, setTheme, setSpotifyToken } from 'containers/App/actions'

import injectSaga from 'utils/redux/injectSaga';

import { Button, FormControlLabel, Switch } from '@material-ui/core';
import { FaSpotify as Spotify} from 'react-icons/fa';

import useStyles from './styles';
import { authorizeSpotify, getSpotifyToken } from './actions';
import saga from './saga';
import makeSelectApp from 'containers/App/selectors';

const Settings = (props) => {
  const classes = useStyles();
  const { theme, seed, playOnLoad, spotifyToken} = useSelector(makeSelectApp());
  const dispatch = useDispatch();
  
  useEffect(() => {
    const params = new URLSearchParams(props.location.search)
    if(!spotifyToken && params.has('code')) dispatch(getSpotifyToken(params.get('code')))
  });

  return (
    <div className={classes.root}>
      <div className={classes.header}>Settings</div>
      {/* <div>Appearance</div>
      <FormControlLabel
        control={
          <Switch
            checked={theme === 'dark'}
            onChange={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
            color="default"
          />
        }
        label="Use dark theme"
      />
      <div>Gameplay</div>
      <FormControlLabel
        control={
          <Switch
            checked={playOnLoad}
            onChange={() => dispatch(setPlayOnLoad(!playOnLoad))}
            color="default"
          />
        }
        label="Start timer on page load"
      /> */}
      <div>Spotify Integration</div>
      {!spotifyToken 
        ? <div>
          <Button onClick={() => dispatch(authorizeSpotify())}>Connect My Spotify <Spotify/></Button>
          <div>
            Connecting Versed with your Spotify account will allow you to sync your playlists between applications.                                            
          </div>
        </div>
        : <Button onClick={() => dispatch(setSpotifyToken(null))}>Disconnect My Spotify <Spotify/></Button>
      }
    </div>
  );
}

const withSaga = injectSaga({ key: 'settings', saga });

export default withSaga(Settings);
