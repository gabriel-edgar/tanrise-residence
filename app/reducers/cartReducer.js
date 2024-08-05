import {actionTypes} from '../actions/cartActions';

const initialState = {
  DataCart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CART_SUCCESS:
      return {
        ...state,
        DataCart: action.DataCart,
      };

    default:
      return state;
  }
};

export default cartReducer;
