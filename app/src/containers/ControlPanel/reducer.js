import { fromJS } from 'immutable';

const startOnLoad = true;

export const initialState = fromJS({
  currentSong: null,
  currentSource: null, 
  currentIndex: 0,
  shuffle: false,
  shuffleMap: null,
  spotifyPlaylists: null,
  spotifyPlaylistsOffset: 0,
  totalSpotifyPlaylists: null,
  playing: startOnLoad,
  hasWon: false,
  hasForfeited: false
 });

export default function controlPanelReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_NEXT_SONG': {
      const currentIndex = state.get('currentIndex')
      const currentSource = state.get('currentSource')
      const nextIndex = currentIndex < (currentSource.length - 1) ? (currentIndex + 1) : 0;
      return state.set('currentIndex', state.get('shuffleMap')[nextIndex]);
    }
    case 'LOAD_PREV_SONG': {
      const currentIndex = state.get('currentIndex');
      const currentSource = state.get('currentSource');
      const prevIndex = currentIndex > 0 ? (currentIndex - 1) : (currentSource.length - 1);
      return state.set('currentIndex', state.get('shuffleMap')[prevIndex]);
    }
    case 'SET_SOURCE':
      return state
        .set('currentSource', action.source)
        .set('shuffleMap', action.source.map((value, index) => index));
    case 'GET_SPOTIFY_PLAYLISTS':
      return state.set('spotifyPlaylists', null);
    case 'GET_SPOTIFY_PLAYLISTS_SUCCESS':
      return state
        .set('spotifyPlaylists', action.playlists)
        .set('spotifyPlaylistsOffset', action.offset)
        .set('totalSpotifyPlaylists', action.total);
    case 'GET_GENIUS_SONG':
      return state
        .set('currentSong', null)
        .set('playing', startOnLoad)
        .set('hasWon', false)
        .set('hasForfeited', false)
        .set('loading', true);
    case 'GET_GENIUS_SONG_SUCCESS':
      return state
        .set('currentSong', action.song)
        .set('loading', false);
    case 'TOGGLE_SHUFFLE':
      const shuffleMap = state.get('currentSource').map((value, index) => index);
      if (!state.get('shuffle')) {
        for(let i = shuffleMap.length -1; i > 0; i--) {
          const j = Math.floor(Math.random()*(i+1));
          [shuffleMap[i], shuffleMap[j]] = [shuffleMap[j], shuffleMap[i]];
        }
      }
      return state
        .set('shuffle', !state.get('shuffle'))
        .set('shuffleMap', shuffleMap );
    case 'TOGGLE_PAUSE':
      return state.set('playing', !state.get('playing'));
    case 'FORFEIT':
      return state.set('hasForfeited', true);
    case 'WIN':
      return state.set('hasWon', true);
    default:
      return state;
  }
}
