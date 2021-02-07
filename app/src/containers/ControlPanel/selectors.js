import { createSelector } from 'reselect';
import { initialState } from './reducer';

const makeSelectControlPanel = () =>
  createSelector(state => state.controlPanel || initialState, substate => substate.toJS());

export default makeSelectControlPanel;

