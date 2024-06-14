export const addCart = (product) => {
    return {
      type: "ADDITEM",
      payload: product,
    };
  };
  
  export const delCart = (product) => {
    return {
      type: "DELITEM",
      payload: product,
    };
  };
  
  export const selectColor = (productId, color) => {
    return {
      type: "SELECT_COLOR",
      payload: { productId, color },
    };
  };
  

export const CLEAR_CART = 'CLEAR_CART';

export const clearCart = () => ({
    type: CLEAR_CART,
});