import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "utils/latinise"

import useStyles from './styles';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import clsx from 'clsx';
import { getGeniusSong, forfeit, win } from 'containers/ControlPanel/actions';
import makeSelectControlPanel from 'containers/ControlPanel/selectors';
import { getGeniusSongSuccess } from '../ControlPanel/actions';


const selectControlPanel = makeSelectControlPanel();

const Song = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentSong : song, hasForfeited, hasWon, playing } = useSelector(selectControlPanel);
  const { id } = useParams();
  const [state, _setState] = useState({
    discoveredWords : []
  });
  
  const setState = (newState) => {
    _setState({
      ...state,
      ...newState
    })
  }

  useEffect(() => {
    dispatch(getGeniusSong(id));
    setState({ discoveredWords: [] });
    return () => dispatch(getGeniusSongSuccess(null));
  }, [id]);

  useEffect(() => {
    if (gameWon()) {
      dispatch(win());
    }
  }, [JSON.stringify(state.discoveredWords), song && song.id])

  const discover = (word, index) => {
    let temp = state.discoveredWords
    temp[index]=word;
    setState({discoveredWords : temp})
  }

  const wordsEquivalent = (lyric, word) => {
    lyric = lyric.toLowerCase().replace(/'/g, "").latinise().trim()
    word = word.toLowerCase().replace(/'/g, "").latinise().trim()
    if ( lyric === word ) {
      return true;
    }
    if ( 
      (lyric.match(/^wh*[oah]{2,}$/) && word.match(/^wh*[oah]{2,}$/)) 
      || (lyric.match(/^o[oh]+$/) && word.match(/^o[oh]+$/)) 
      || (lyric.match(/^a[ah]+$/) && word.match(/^a[ah]*$/))
      || (lyric.match(/^h[ah]+$/) && word.match(/^h[ah]*$/)) 
    ) return true;
    return false;
  }

  const lyricDiscovered = (word) => {
    return (state.discoveredWords.map((w) => wordsEquivalent(w, word)).includes(true))
  }

  const checkWord = (event) => {
    let word = event.target.value
    if (lyricDiscovered(word)) return;
    song.lyrics.forEach((w, index) => {
      if(wordsEquivalent(w, word)) {
        discover(w, index);
        event.target.value = ""
      }
    })
  }

  const gameWon = () => {
    if (!song) return false;
    return JSON.stringify(state.discoveredWords) === JSON.stringify(song.lyrics)
  }

  if(song) {
    return (
      <div className={classes.root}>
        <div className={classes.game}>
          <input className={classes.input} type="search" disabled={hasForfeited || !playing || hasWon} onChange={checkWord}/> 
          <div className={classes.info}>
            <div>{state.discoveredWords.filter((word) => word).length} / {song.lyrics.length}</div>
            <button className={classes.button} disabled={!playing || hasForfeited || hasWon} onClick={() => dispatch(forfeit())}>Forfeit</button>
          </div>
          <div className={classes.lyrics}>
            {!playing && <div className={classes.pauseOverlay}>
                Paused
            </div>}
            {song.lyrics.map((word, index) => <div key={index} className={clsx(classes.word, lyricDiscovered(word) && playing ? undefined : hasForfeited ? classes.forfeit : classes.undiscovered)}>{word}</div>)}
          </div>
        </div>
      </div>
    );
  }
  else return <div className={classes.root}>Loading...</div>
}
export default Song;
