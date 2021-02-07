import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 * 
 * @returns {function} A component wrapper
 * 
 * @memberof module:Utils/Redux
 * 
 */
 const injectReducer = ({ key, reducer }) => WrappedComponent => {
  class InjectReducer extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    constructor(props, context) {
      super(props, context);
      getInjectors(context.store).injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectReducer, WrappedComponent);
};

/**
 * Hook for dynamically injecting a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 * 
 * @returns {void}
 * 
 * @memberof module:Utils/Redux
 * 
 */
const useInjectReducer = ({ key, reducer }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };

export default injectReducer;
