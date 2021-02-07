import { createSelector } from 'reselect';
import { initialState } from './reducer';

const makeSelectCustomPlaylist = () =>
  createSelector(state => state.customPlaylist || initialState, substate => substate.toJS());

export default makeSelectCustomPlaylist;

