// import CartController from '../controllers/CartController';

export const actionTypes = {
  CART_SUCCESS: 'CART_SUCCESS',
};

const cart_success = DataCart => ({
  type: actionTypes.CART_SUCCESS,
  //   user,'
  DataCart,
});

export const data_cart = items => async dispatch => {
  const datacartSet = items;

  console.log('datadatacartSet', datacartSet);
  dispatch(cart_success(datacartSet));
  // console.log('notifikasi nbadge', notifnbadge);
  //   dispatch(editRequest());
};
