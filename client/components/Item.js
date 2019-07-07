import React from 'react';

const handleAddToCart = function(id){
    window.dispatchEvent(new CustomEvent('addToCart', {
        detail: {
            id
        }
    }))
}

const Item = props => {
  return (
    <div className={"carousel-item" + (props.left ? " left" : "")}>
      <img
        className="carousel-item__photo"
        src="https://images.homedepot-static.com/productImages/c275d0bb-5e98-412c-b1b1-8726fd1f1477/svn/dewalt-claw-hammers-dwht51054-64_300.jpg"
        alt="HDX Hammer"
      />
      <div className="carousel-item__description">
        <span className="carousel-item__brand">HDX </span>
        16 oz. Fiberglass Handle Hammer
      </div>
      <div className="carousel-item__stars">***** (number)</div>
      <div className="carousel-item__price">
        <span className="$ price">$</span>
        <span className="dollars">5</span>
        <span className="cents price">97</span>
        <span className="each">/each</span>
      </div>
      <button 
      className="add-to-cart"
      onClick={()=>handleAddToCart(props.itemId)}
      >
          Add To Cart
      </button>
    </div>
  );
};

export default Item;
