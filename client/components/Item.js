import React from 'react';
import Rating from 'react-rating';

const Item = ({ product, getRelatedProducts }) => {
  const price = product.price.split('.');
  const dollars = price[0];
  const cents = price[1] || '00';

  const handleAddToCart = function(id, event) {
    event.stopPropagation();
    window.dispatchEvent(
      new CustomEvent('addToCart', {
        detail: {
          id,
        },
      })
    );
  };

  return (
    <div
      className="carousel-item"
      onClick={() => {
        getRelatedProducts(product.ID);
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
        onClick={event => handleAddToCart(product.ID, event)}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Item;
