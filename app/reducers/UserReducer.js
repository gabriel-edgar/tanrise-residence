import { actionTypes } from "../actions/UserActions";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.EDIT:
      return {
        ...state,
        // ...action.edits,
        user: action.edits,
        // pict: action.edits,
      };
    case actionTypes.CHANGE_FOTO:
      return {
        ...state,
        // ...user,
        pict: action.edits,

        // pict: action.edits.pict,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: [],
      };
    case actionTypes.REMOVE_USER:
      return {
        //...state,
        user: [],
      };

    default:
      return state;
  }
};

export default userReducer;
