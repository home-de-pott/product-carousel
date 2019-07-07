import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

window.addEventListener('addToCart', event => {
  console.log('added to cart', event.detail);
});

ReactDOM.render(<App />, document.getElementById('carousel'));
