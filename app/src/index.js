/**
 * @module Main
 */

import React from 'react';
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

import App from './containers/App';

import configureStore from './configureStore';

const initialState = {}
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/> 
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App');
}

serviceWorker.unregister();
