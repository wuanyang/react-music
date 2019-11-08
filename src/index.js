import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store/index.js'
import Player from './components/player/player.js';

ReactDOM.render(
  (
    <Provider store={store}>
      <div>
        <App />
        <Player />
      </div>
    </Provider>
  ), document.getElementById('root'));