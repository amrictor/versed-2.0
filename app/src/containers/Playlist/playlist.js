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
  getPlaylist,
} from './actions';
import useStyles from './styles';


const selectPlaylist = createSelector(
  state => state.playlist,
  substate => substate.toJS()
);

const Playlist = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tracks, trackOffset, totalTracks, loading } = useSelector(selectPlaylist);
  useEffect(()=> {
    dispatch(getPlaylist(id))
  }, [id])

  return (
    <div className={classes.root}>
      {loading 
        ? <div className={classes.loading}>Loading...</div> 
        : <SongList tracks={tracks}/>}
    </div>
  );
}

const withReducer = injectReducer({ key: 'playlist', reducer });
const withSaga = injectSaga({ key: 'playlist', saga });

export default compose(withReducer, withSaga)(Playlist);
