import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter  } from 'react-router-dom';

import App from './app/App';

import configureStore from './configureStore';


const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('index');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter >
    </Provider>,
    MOUNT_NODE
  );
};


render();