import invariant from 'invariant';

import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import conformsTo from 'lodash/conformsTo';

import checkStore from './checkStore';

const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
const DAEMON = '@@saga-injector/daemon';
const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

/**
 * Checks validity of key
 * 
 * @param {string} key A non empty string
 * 
 * @returns {void}
 * 
 * @memberof module:Utils/Redux
 *
 */
const checkKey = key =>
  invariant(
    isString(key) && !isEmpty(key),
    '(app/utils...) injectSaga: Expected `key` to be a non empty string',
  );

/**
 * Checks validity of descriptor
 * 
 * @param {object} descriptor A valid saga descriptor
 * 
 * @returns {void}
 * 
 * @memberof module:Utils/Redux
 *
 */
const checkDescriptor = descriptor => {
  const shape = {
    saga: isFunction,
    mode: mode => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor',
  );
};

/**
 * Factory for injectors
 * 
 * @param {object} store A redux store
 * @param {boolean} isValid A flag indicating a valid store
 * 
 * @returns {function} injectSaga(key, reducer)
 * 
 * @memberof module:Utils/Redux
 *
 */
export function injectSagaFactory(store, isValid) {
  /**
   * Dynamically injects a saga
   * 
   * @param {string} key A key of the saga
   * @param {function} descriptor A root saga that will be injected
   * @param {array} args Arguments to be provided to saga
   * 
   * @returns {void}
   * 
   * @memberof module:Utils/Redux
   *
   */
  return function injectSaga(key, descriptor = {}, args) {
    if (!isValid) checkStore(store);

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON,
    };
    const { saga, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args),
      };
    }
  };
}

/**
 * Factory for ejectors
 * 
 * @param {object} store A redux store
 * @param {boolean} isValid A flag indicating a valid store
 * 
 * @returns {function} ejectSaga(key)
 * 
 * @memberof module:Utils/Redux
 *
 */
export function ejectSagaFactory(store, isValid) {
  /**
   * Dynamically ejects a saga
   * 
   * @param {string} key A key of the saga
   * 
   * @returns {void}
   * 
   * @memberof module:Utils/Redux
   *
   */
  return function ejectSaga(key) {
    if (!isValid) checkStore(store);

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done';
        }
      }
    }
  };
}

/**
 * Gets saga injectors
 * 
 * @param {object} store A redux store
 * 
 * @returns {object} Object containing injectSaga function and ejectSaga function
 * 
 * @memberof module:Utils/Redux
 *
 */
function getInjectors(store) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}

export default getInjectors;