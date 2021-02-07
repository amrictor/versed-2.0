import React, { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import injectSaga from 'utils/redux/injectSaga';
import injectReducer from 'utils/redux/injectReducer';

import SongList from 'components/SongList';

import reducer from './reducer';
import saga from './saga';
import { 
  getAlbum,
} from './actions';
import useStyles from './styles';


const selectAlbum = createSelector(
  state => state.album,
  substate => substate.toJS()
);

const Album = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tracks, trackOffset, totalTracks, loading } = useSelector(selectAlbum);
  
  useEffect(()=> {
    dispatch(getAlbum(id))
  }, [id])

  return (
    <div className={classes.root}>
      {loading || tracks.length === 0 ? 'Loading...' : 
      <div>
        <div className={classes.outerAlbumHeader}>
          <div className={classes.innerAlbumHeader}>
            <img className={classes.albumArt} src={ tracks[0].album.images[1].url}/>
            <div className={classes.albumInfo}>
              <div className={classes.albumTitle}>{tracks[0].album.name}</div>
              <div className={classes.albumArtists}>{tracks[0].album.artists.map(artist => artist.name).join(', ')}</div>
            </div>
          </div>
        </div>
        <SongList tracks={tracks}/>
      </div>}
    </div>
  );
}

const withReducer = injectReducer({ key: 'album', reducer });
const withSaga = injectSaga({ key: 'album', saga });

export default compose(withReducer, withSaga)(Album);
