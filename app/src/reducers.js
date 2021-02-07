/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import globalReducer from './containers/App/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 * 
 * @param injectedReducers An object populated with injected child reducers
 * 
 * @returns {function} A single reducer function that calls every child reducer
 * 
 * @memberof module:Main
 * 
 */
function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

export default createReducer;