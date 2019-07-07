import React, { Component } from 'react';
import Item from './Item';
import Carousel from './Carousel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="carousel">
        <span className="carousel-title">
          Customers Who Viewed This Item Bought...
        </span>
        <Carousel />
      </div>
    );
  }
}

export default App;
