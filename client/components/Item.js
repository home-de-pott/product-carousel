import React from 'react';
import Rating from 'react-rating';
import handle from '../handlers/handle';

const Item = ({ product }) => {
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
      <div className="carousel-item__stars">
        <Rating
          initialRating={3.5}
          readonly={true}
          emptySymbol="fa fa-star-o fa-1x yellow"
          fullSymbol="fa fa-star fa-1x yellow"
          fractions={2}
        />
        <span className="carousel-item__reviews"> (270)</span>
      </div>
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
};

export default Item;
