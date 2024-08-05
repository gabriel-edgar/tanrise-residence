import ProjectController from '../controllers/ProjectController';

export const actionTypes = {
  PROJECT_SUCCESS: 'PROJECT_SUCCESS',
};

const project_success = Dataproject => ({
  type: actionTypes.PROJECT_SUCCESS,
  //   user,'
  Dataproject,
});

export const data_project = email => async dispatch => {
  const dataproject = await ProjectController.data_project(email);
  console.log('dataproject di project  action', dataproject.Data);
  dispatch(project_success(dataproject));
  // console.log('notifikasi nbadge', notifnbadge);
  //   dispatch(editRequest());
};

// export const login = (email, password, token_firebase) => async dispatch => {
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
