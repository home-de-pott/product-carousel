import React, { Component } from 'react';
import Carousel from './Carousel';

import http from '../http/http.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      title: 'No recently viewed items...',
      loading: true,
    };
  }

  async componentDidMount() {
    const productId = window.location.pathname.slice(10);
    if (productId) {
      console.log('Carousel did mount. Getting', productId);
      this.setState({ title: 'Customers who viewed this item also bought...' });
      await this.getProducts(productId);
    } else {
      await this.getRecentlyViewed();
    }
    this.setState({ loading: false });
  }

  async getProducts(id) {
    console.log('gettingProduct', id);
    try {
      const products = await http.relatedProducts.get(id);
      console.log('Got related products', products);
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
      if (products.length === 0) {
        console.log('no recently viewed products');
        return;
      }
      products = products.slice(0, 10).map(product => {
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
    return this.state.loading ? (
      <div className="spinner">&#128296;</div>
    ) : (
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
