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
    //add scripts to document
    this.appendScript('https://kit.fontawesome.com/af1dfc4933.js');
    this.appendStylesheet(
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
    );
    this.appendStylesheet(
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
    );
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

  appendScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
  }

  appendStylesheet(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.charset = 'UTF-8';
    link.href = url;
    document.head.appendChild(link);
  }

  async getRelatedProducts(id) {
    console.log('gettingProduct', id);
    try {
      const products = await http.productData.get(id);
      console.log('Got related products', products);
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
