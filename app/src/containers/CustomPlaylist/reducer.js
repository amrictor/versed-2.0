import { fromJS } from 'immutable';
import { getRichCookie, setCookie } from 'utils/cookies'

export const initialState = fromJS({
  customPlaylist: []
 }).set('customPlaylist', getRichCookie("customPlaylist") || []);


export default function customPlaylistReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case 'ADD_SONG':
      newState = state.set('customPlaylist', [...state.get('customPlaylist'), action.song]); break;
    case 'DELETE_SONG':
      newState = state.set('customPlaylist', state.get('customPlaylist').filter(song => song.id !== action.song.id)); break;
    default:
      return state;
  }
  setCookie('customPlaylist', newState.get('customPlaylist'));
  return newState;
}
