import { actionTypes } from "../actions/UserActions";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  //console.log("8 reduser user: ", action);
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        accessToken: action.user.Token,
        refreshToken: action.user.refreshToken,
      };
    case actionTypes.REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.token,
        user: {
          ...state.user,
          Token: action.token,
        },
      };
    case actionTypes.EDIT:
      return {
        ...state,
        user: {
          ...state.user,
          userData: {
            ...state.user.userData,
            name: action.edits.name,
            Handphone: action.edits.handphone,
            //gender: action.edits.gender,
          },
        },
      };
    case actionTypes.CHANGE_FOTO:
      return {
        ...state,
        // ...user,
        user: {
          ...state.user,
          userData: { ...state.user.userData, pict: action.edits },
        },

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
