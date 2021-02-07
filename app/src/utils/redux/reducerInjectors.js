import invariant from 'invariant';

import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import checkStore from './checkStore';
import createReducer from '../../reducers';

/**
 * Factory for injectors
 * 
 * @param {object} store A redux store
 * @param {boolean} isValid A flag indicating a valid store
 * 
 * @returns {function} injectReducer(key, reducer)
 * 
 * @memberof module:Utils/Redux
 *
 */
export function injectReducerFactory(store, isValid) {

  /**
   * Dynamically injects a reducer
   * 
   * @param {string} key A key of the reducer
   * @param {function} reducer A reducer that will be injected
   * 
   * @returns {void}
   * 
   * @memberof module:Utils/Redux
   *
   */
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store);
    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

/**
 * Gets reducer injectors
 * 
 * @param {object} store A redux store
 * 
 * @returns {object} Object containing injectReducer function
 * 
 * @memberof module:Redux
 *
 */
export default function getInjectors(store) {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true),
  };
}