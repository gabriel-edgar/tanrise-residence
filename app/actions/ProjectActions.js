import ProjectController from "../controllers/ProjectController";

export const actionTypes = {
  PROJECT_SUCCESS: "PROJECT_SUCCESS",
  UNIT_SUCCESS: "UNIT_SUCCESS",
  CHOOSED_UNIT: "CHOOSED_UNIT",
  CHOOSED_PROJECT: "CHOOSED_PROJECT",
  CHOOSED_CLUSTER: "CHOOSED_CLUSTER",
  HELPDESK_DOT: "HELPDESK_DOT",
  PROJECT_DOT: "PROJECT_DOT",
  NOTIFICATION_DATA: "NOTIFICATION_DATA",
  NOTIFICATION_DATA_PERSIST: "NOTIFICATION_DATA_PERSIST",
};

const project_success = (Dataproject) => ({
  type: actionTypes.PROJECT_SUCCESS,
  //   user,'
  Dataproject,
});

const unit_success = (dataUnit) => ({
  type: actionTypes.UNIT_SUCCESS,
  dataUnit,
});

const choosedunit_success = (choosedUnit) => ({
  type: actionTypes.CHOOSED_UNIT,
  choosedUnit,
});

const choosedproject_success = (choosedProject) => ({
  type: actionTypes.CHOOSED_PROJECT,
  choosedProject,
});

const choosedcluster_success = (choosedCluster) => ({
  type: actionTypes.CHOOSED_CLUSTER,
  choosedCluster,
});

const change_helpdesk_dot = (state) => ({
  type: actionTypes.HELPDESK_DOT,
  state,
});

const change_project_dot = (state) => ({
  type: actionTypes.PROJECT_DOT,
  state,
});

const change_notification_data = (state) => ({
  type: actionTypes.NOTIFICATION_DATA,
  state,
});

const change_notification_data_persist = (state) => ({
  type: actionTypes.NOTIFICATION_DATA_PERSIST,
  state,
});

export const data_project = (dataproject) => async (dispatch) => {
  //console.log("15_1 dataproject di project action: ", email);
  //const dataproject = await ProjectController.data_project(email);
  console.log("15_2 dataproject di project action: ", dataproject);
  dispatch(project_success(dataproject));
};

export const data_unit = (entity_cd, project_no, email, cluster_cd) => async (dispatch) => {
  console.log(
    "16_1 dataunit di project action: ",
    entity_cd,
    project_no,
    email
  );
  const dataunit = await ProjectController.data_unit(
    entity_cd,
    project_no,
    email,
    cluster_cd
  );
  console.log("460 16_2 dataunit di project action: ", dataunit);
  dispatch(unit_success(dataunit));
};

export const choosed_unit = (unit) => async (dispatch) => {
  console.log("17_1 dataunit di project action: ", unit);
  dispatch(choosedunit_success(unit));
};

export const choosed_project = (project) => async (dispatch) => {
  console.log("18_1 dataProject di project action: ", project);
  dispatch(choosedproject_success(project));
};

export const choosed_cluster = (cluster) => async (dispatch) => {
  // console.log("18_1 cluster di project action: ");
  dispatch(choosedcluster_success(cluster));
};

export const action_helpdesk_dot = (state) => async (dispatch) => {
  //console.log("19_1 dataState di project action: ", state);
  dispatch(change_helpdesk_dot(state));
};

export const action_project_dot = (state) => async (dispatch) => {
  //console.log("20_1 dataState di project action: ", state);
  dispatch(change_project_dot(state));
};

export const action_remove_redux_dot = () => async (dispatch) => {
  //console.log("21_1 dataState di project action: ");
  dispatch(change_helpdesk_dot(false));
  dispatch(change_project_dot(false));
  dispatch(change_notification_data([]));
};

export const action_data_notification = (state) => async (dispatch) => {
  //console.log("22_1 dataState di project action: ", state);
  dispatch(change_notification_data(state));
};

export const action_data_notification_persist = (state) => async (dispatch) => {
  //console.log("22_1 dataState di project action: ", state);
  dispatch(change_notification_data_persist(state));
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
