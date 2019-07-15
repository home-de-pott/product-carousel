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
    window.addEventListener('getProduct', event => {
      this.getRelatedProducts(event.detail.id);
    });
    //if path includes id parameter, get related products
    const productId = window.location.pathname.slice(10);
    if (productId) {
      console.log('Component did mount. Getting', productId);
      this.getRelatedProducts(productId);
    }
  }

  async getRelatedProducts(id) {
    console.log('gettingProduct', id);
    try {
      const products = await http.productData.get(id);
      await this.setState({ products });
      return;
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
