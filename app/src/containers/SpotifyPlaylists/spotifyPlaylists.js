import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import makeSelectControlPanel from 'containers/ControlPanel/selectors';
import makeSelectApp from '../App/selectors';

import { getSpotifyPlaylists } from 'containers/ControlPanel/actions';
import { TablePagination } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const SpotifyPlaylists = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotifyToken } = useSelector(makeSelectApp());
  const { spotifyPlaylists, spotifyPlaylistsOffset, totalSpotifyPlaylists } = useSelector(makeSelectControlPanel());

  useEffect(() => {
    dispatch(getSpotifyPlaylists());
  }, [JSON.stringify(spotifyToken)])

  return (   
    spotifyToken && <div className={classes.root}>
      <div className={classes.header}>
        My Spotify Playlists
      </div>
      <div className={classes.playlistsList}>
        {spotifyPlaylists && spotifyPlaylists.map(playlist => 
          <div className={classes.playlist} key={playlist.id} onClick={()=>history.push(`/playlist/${playlist.id}`)}>
            {playlist.name}
          </div>)}
      </div>
      <TablePagination
        component="div"
        className={classes.pagination}
        rowsPerPageOptions={[20]}
        count={totalSpotifyPlaylists || 0}
        rowsPerPage={20}
        page={spotifyPlaylistsOffset / 20}
        onChangePage={(event, value) => dispatch(getSpotifyPlaylists(value*20))}
      />
    </div>
    
  );
}

export default SpotifyPlaylists;
