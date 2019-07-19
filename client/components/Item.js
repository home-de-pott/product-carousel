import React, { Component } from 'react';
import Stars from './Stars';

import http from '../http/http';
import handle from '../handlers/handle';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avgRating: 0,
      numberOfRatings: 0,
    };
  }

  async componentDidMount() {
    const reviews = await http.reviews.get(this.props.product.ID);
    const avgRating = this.getAvgRating(reviews);
    const numberOfRatings = reviews.length;
    this.setState({ avgRating, numberOfRatings });
  }

  getAvgRating(reviews) {
    let totalRating = 0;
    for (let review of reviews) {
      totalRating += review.rating;
    }
    return Math.round((totalRating / reviews.length) * 10) / 10;
  }

  render() {
    const product = this.props.product;
    const price = product.price.split('.');
    let dollars = price[0];
    let cents = price[1] || '00';
    if (cents.length === 1) {
      cents += '0';
    }
    return (
      <div
        className="carousel-item-brian"
        onClick={() => {
          handle.getProduct(product.ID);
        }}
      >
        <img
          className="carousel-item__photo"
          src={product.photo}
          alt={product.name}
        />
        <div className="carousel-item__description">
          <span className="carousel-item__brand">{product.brand} </span>
          {product.name}
        </div>
        <Stars
          rating={this.state.avgRating}
          numberOfRatings={this.state.numberOfRatings}
        />
        <div className="carousel-item__price">
          <span className="$ price">$</span>
          <span className="dollars">{dollars}</span>
          <span className="cents price">{cents}</span>
          <span className="each">/each</span>
        </div>

        <button
          className="add-to-cart"
          type="button"
          onClick={event => handle.addToCart(product.ID, event)}
        >
          Add To Cart
        </button>
      </div>
    );
  }
}

export default Item;
