import * as actionTypes from "@/actions/actionTypes";
const initialState = {
  login: {
    success: true,
  },
  user: {
    lang: "en",
  },
};

export default (state = initialState, action = {}) => {
  //console.log("12 reducer auth: ", action);
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        login: action.data,
      };
    default:
      return state;
  }
};
