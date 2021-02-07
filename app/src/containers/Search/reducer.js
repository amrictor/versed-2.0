import { fromJS } from 'immutable';

const initialState = fromJS({
  tracks : [],
  trackOffset: 0,
  totalTracks: null,
  loading: false
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return state.set('loading', true);
    case 'SEARCH_TRACKS_SUCCESS':
      return state
        .set('tracks', action.tracks)
        .set('trackOffset', action.offset)
        .set('totalTracks', action.total)
        .set('loading', false);
    case 'SEARCH_TRACKS_FAILURE':{
      return state.set('loading', false);}
    default:
      return state;
  }
}
