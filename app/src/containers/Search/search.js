import React, { useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import injectSaga from 'utils/redux/injectSaga';
import injectReducer from 'utils/redux/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { 
  searchTracks 
} from './actions';
import useStyles from './styles';
import { getSpotifySong } from '../ControlPanel/actions';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { addSong } from '../CustomPlaylist/actions';
import SongList from '../../components/SongList';

const selectSearch = createSelector(
  state => state.search,
  substate => substate.toJS()
);

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tracks, trackOffset, totalTracks, loading } = useSelector(selectSearch);
  const [ query, setQuery ] = useState('')
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <input className={classes.input} value={query} onChange={(evt)=>setQuery(evt.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') dispatch(searchTracks(query, 0))}} disabled={loading}/>
        <button className={classes.button} onClick={()=>dispatch(searchTracks(query, 0))} disabled={loading}>
          Search
        </button>
      </div>
      <SongList tracks={tracks}/>
    </div>
  );
}

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(withReducer, withSaga)(Search);
