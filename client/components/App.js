import React, { Component } from 'react';
import Carousel from './Carousel';

import http from '../http/http.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }

  componentDidMount() {
    const productId = window.location.pathname.slice(10);
    console.log('Getting', productId);
    this.getRelatedProducts(productId);
  }

  async getRelatedProducts(id) {
    //history.pushState changes the url without triggering a refresh
    history.pushState({}, null, '/products/' + id);
    window.dispatchEvent(new CustomEvent('getProduct', { detail: { id } }));
    try {
      const products = await http.productData.get(id);
      this.setState({ products });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="carousel">
        <span className="carousel-title">
          Customers Who Viewed This Item Bought...
        </span>
        <Carousel
          products={this.state.products}
          getRelatedProducts={this.getRelatedProducts}
        />
      </div>
    );
  }
}

export default App;
