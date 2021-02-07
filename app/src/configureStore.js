/**
 * Configure redux store
 */

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import createReducer from './reducers';

/**
 * Configures and returns initial redux store
 *
 * @param {object} initialState The initial state of the application
 * 
 * @return {object} A redux store
 * 
 * @memberof module:Main
 *
 */
function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  return store;
}

export default configureStore;