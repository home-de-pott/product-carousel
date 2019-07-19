import React, { Component } from 'react';
import Carousel from './Carousel';

import http from '../http/http.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      title: 'No recently viewed items...',
    };
  }

  componentDidMount() {
    //add scripts to document
    // this.appendStylesheet(
    //   'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
    // );
    // this.appendStylesheet(
    //   'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
    // );

    window.addEventListener('getProduct', event => {
      this.getProducts(event.detail.id);
    });
    //if path includes id parameter, get related products
    const productId = window.location.pathname.slice(10);
    if (productId) {
      console.log('Component did mount. Getting', productId);
      this.setState({ title: 'Customers who viewed this item also bought...' });
      this.getProducts(productId);
    } else {
      this.getRecentlyViewed();
    }
  }

  //clean this up
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

  async getProducts(id) {
    console.log('gettingProduct', id);
    try {
      const products = await http.relatedProducts.get(id);
      console.log('Got related products');
      if (!products) {
        console.log('no products');
        return;
      }
      await this.setState({ products });
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async getRecentlyViewed() {
    console.log('getting recently viewed');
    try {
      let products = await http.recentlyViewedProducts.get();
      console.log('Got recently viewed products', products);
      if (!products) {
        console.log('no recently viewed products');
        return;
      }
      products = products.map(product => {
        return http.products.get(product.id);
      });
      Promise.all(products).then(products => {
        console.log(products);
        this.setState({
          products,
          title: 'Recently viewed products...',
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="carousel">
        <div className="carousel-title__container">
          <span className="carousel-title">{this.state.title}</span>
        </div>
        {this.state.products.length > 0 ? (
          <Carousel products={this.state.products} />
        ) : null}
      </div>
    );
  }
}

export default App;
