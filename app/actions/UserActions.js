import UserController from "../controllers/UserController";

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",

  RESETPASS: "RESETPASS",
  RESETPASS_REQUEST: "RESETPASS_REQUEST",
  RESETPASS_ERROR: "RESETPASS_ERROR",
  RESETPASS_SUCCESS: "RESETPASS_SUCCESS",

  CHANGEPASS: "CHANGEPASS",
  CHANGEPASS_REQUEST: "CHANGEPASS_REQUEST",
  CHANGEPASS_ERROR: "CHANGEPASS_ERROR",
  CHANGEPASS_SUCCESS: "CHANGEPASS_SUCCESS",

  EDIT: "EDIT",
  CHANGE_FOTO: "CHANGE_FOTO",

  REMOVE_USER: "REMOVE_USER",

  // LOAD_LOTNO: 'LOAD_LOTNO'

  REFRESH_TOKEN: "REFRESH_TOKEN",
};

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginError = (error) => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
});

const refreshToken = (token) => ({
  type: actionTypes.REFRESH_TOKEN,
  token,
});

const resetPassRequest = () => ({
  type: actionTypes.RESETPASS_REQUEST,
});

const resetPassError = (error) => ({
  type: actionTypes.RESETPASS_ERROR,
  error,
});

const resetPassSuccess = (user) => ({
  type: actionTypes.RESETPASS_SUCCESS,
  user,
});

const changePassRequest = () => ({
  type: actionTypes.CHANGEPASS_REQUEST,
});

const changePassError = (error) => ({
  type: actionTypes.CHANGEPASS_ERROR,
  error,
});

const changePassSuccess = (user) => ({
  type: actionTypes.CHANGEPASS_SUCCESS,
  user,
});

const editRequest = (edits) => ({
  type: actionTypes.EDIT,
  edits,
});

const changeFoto = (edits) => ({
  type: actionTypes.CHANGE_FOTO,
  edits,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

const removeUser = (user) => ({
  type: actionTypes.REMOVE_USER,
  user: null,
});

// const loadLotno = user => ({
//   type: actionTypes.LOAD_LOTNO,
//   user,
// });

export const login = (email, password, token_firebase) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await UserController.login(email, password, token_firebase);
    dispatch(loginSuccess(user.data));
    console.log("99 UserActions:", user);
    // alert("JSON.stringify(user)");
  } catch (error) {
    //alert("102 UserActions: ", error);
    console.log("103 UserActions: ", error);
    dispatch(loginError(error));
  }
};

export const refreshTokenAction = (token) => async (dispatch) => {
  try {
    dispatch(refreshToken(token));
    console.log("111 token:", token);
    // alert("JSON.stringify(user)");
  } catch (error) {
    //alert("102 UserActions: ", error);
    console.log("111 error: ", error);
  }
};

export const reset = (newPass, conPass, email) => async (dispatch) => {
  dispatch(resetPassRequest());
  try {
    const user = await UserController.resetPassword(newPass, conPass, email);
    console.log(user);

    alert("Please Back to Login");
    dispatch(resetPassSuccess(user.Data));
    dispatch(logout());
  } catch (error) {
    console.log(error);

    dispatch(resetPassError(error));
  }
};

export const logout = (email) => async (dispatch) => {
  console.log("143 run1 logout");
  //await UserController.logout(email);
  console.log("143 run2 logout");
  dispatch(logoutRequest());
  console.log("143 run3 logout");
  // dispatch(logout());
  dispatch(removeUser());
};

export const saveProfile = (data) => async (dispatch) => {
  console.log("user action save profile", data);
  const res = await UserController.saveProfile(data);
  console.log("res save profil", res);
  alert(res.data.message);
  //alert(res.data.data);
  dispatch(editRequest(res.data.data));
};

export const saveFotoProfil = (data) => async (dispatch) => {
  console.log("image change profil action save profile", data);
  const res = await UserController.saveFotoProfil(data);
  //console.log("res save profil", res);
  alert(res.data.message);
  console.log("166 res.data.data.pict: ", res.data.data.pict);
  dispatch(changeFoto(res.data.data.pict));
};

export const changePass = (email, pass, conpass) => async (dispatch) => {
  dispatch(changePassRequest());
  try {
    const res = await UserController.changePassword(email, pass, conpass);
    alert(res.Pesan);
    dispatch(changePassSuccess(res.Data));
  } catch (error) {
    dispatch(changePassError(error));
  }
};

// export const loadLotno = () => async dispatch => {
//   dispatch(loginRequest());
//   try {
//     const user = await UserController.login(email, password, token_firebase);
//     dispatch(loginSuccess(user.Data));
//     console.log('userrrrr', user);
//     // alert("JSON.stringify(user)");
//   } catch (error) {
//     alert(error);
//     dispatch(loginError(error));
//   }
// };
