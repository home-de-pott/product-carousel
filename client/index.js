import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

window.addEventListener('addToCart', async event => {
  console.log('added to cart', event.detail);
});

ReactDOM.render(<App />, document.getElementById('carousel'));
