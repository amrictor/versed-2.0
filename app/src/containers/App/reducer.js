/*
 * AppReducer
 */

import { fromJS } from 'immutable';
import { getRichCookie, setCookie } from 'utils/cookies'
import { defaultSettings } from 'utils/constants'

export const initialState = fromJS(
  {...(getRichCookie("settings") || defaultSettings)}
);

function appReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case'SET_THEME':
      newState = state.set('theme', action.theme); break;
    case'SET_PLAY_ON_LOAD':
      newState = state.set('playOnLoad', action.playOnLoad); break;
    case'SET_SEED':
      newState = state.set('seed', action.seed); break;
    case'SET_SPOTIFY_TOKEN':
      newState = state.set('spotifyToken', action.token); break;
    default:
      return state; 
  } 
  setCookie('settings', newState.toJSON(), 365);
  return newState;
}

export default appReducer;