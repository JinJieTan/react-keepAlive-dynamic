import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider, KeepAlive } from 'react-component-keepalive';
ReactDOM.render(
  <Provider>
    <KeepAlive name="App">
      <App />
    </KeepAlive>
  </Provider>,

  document.querySelector('#root')
);
