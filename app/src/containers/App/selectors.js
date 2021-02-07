import { createSelector } from 'reselect';
import { initialState } from './reducer';

const makeSelectApp = () =>
  createSelector(state => state.app || initialState, substate => substate.toJS());

export default makeSelectApp;