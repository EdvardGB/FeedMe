import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router  } from 'react-router';
import history from './history';


import App from './app/App';

import configureStore from './configureStore';

const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('index');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} >
        <App />
      </Router >
    </Provider>,
    MOUNT_NODE
  );
};


render();