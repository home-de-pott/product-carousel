const addToCart = function(id, event) {
  console.log('adding to cart', id);
  event.stopPropagation();
  window.dispatchEvent(
    new CustomEvent('addToCart', {
      detail: {
        id,
      },
    })
  );
};
const getProduct = id => {
  history.pushState({}, null, '/products/' + id);
  window.dispatchEvent(new CustomEvent('getProduct', { detail: { id } }));
};

export default { addToCart, getProduct };
