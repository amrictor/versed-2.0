import React, { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Shuffle from '@material-ui/icons/Shuffle';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import VisibilityOff from '@material-ui/icons/VisibilityOffOutlined';
import Visibility from '@material-ui/icons/VisibilityOutlined';
import IconButton from '@material-ui/core/IconButton';

import Timer from 'components/Timer';

import injectSaga from 'utils/redux/injectSaga';
import injectReducer from 'utils/redux/injectReducer';

import reducer from './reducer';
import saga from './saga';
import useStyles from './styles';
import { 
  getSpotifyPlaylists,
  getSpotifySong,
  loadNextSong,
  loadPreviousSong,
  togglePause,
  toggleShuffle, 
} from './actions';
import makeSelectControlPanel from './selectors';
const selectControlPanel = makeSelectControlPanel();

const ControlPanel = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { playing, shuffle, currentSong, currentSource, currentIndex, spotifyPlaylists, hasForfeited, hasWon } = useSelector(selectControlPanel);

  useEffect(() => {
    if(!spotifyPlaylists) dispatch(getSpotifyPlaylists());
  }, []);

  useEffect(() => {
    if (currentSource) {
      dispatch(getSpotifySong(currentSource[currentIndex].id, history.push, true));
    }
  }, [currentIndex, JSON.stringify(currentSource)]);

  return (
    <div className={classes.root}>
      {currentSong && <Timer playing={playing && !hasForfeited && !hasWon} songId={currentSong.id} className={classes.timer}/>}
      {currentSong && <div className={classes.actions}>
        {currentSource && <IconButton style={shuffle ? {color: '#1DB954'} : {}} className={classes.actionBtn} size='small' onClick={() => dispatch(toggleShuffle())}>
          <Shuffle/>
        </IconButton>}
        {currentSource && <IconButton className={classes.actionBtn} size='small' onClick={() => dispatch(loadPreviousSong())}>
          <SkipPrevious/>
        </IconButton>}
        <IconButton disabled={hasForfeited || hasWon} className={classes.actionBtn} size='small' onClick={()=> dispatch(togglePause())}>
          {playing ? <Pause/> : <PlayArrow/>}
        </IconButton>
        {currentSource && <IconButton className={classes.actionBtn} size='small' onClick={() => dispatch(loadNextSong())}>
          <SkipNext/>
        </IconButton>}
        {/* {<IconButton className={classes.actionBtn} size='small' onClick={() => dispatch(toggleVisibility())}>
          <VisibilityOff/>
        </IconButton>} */}
      </div>}
      {!currentSong && 'Nothing playing.'}
    </div>
  );
}

const withReducer = injectReducer({ key: 'controlPanel', reducer });
const withSaga = injectSaga({ key: 'controlPanel', saga });

export default compose(withReducer, withSaga)(ControlPanel);
