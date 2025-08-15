import { actionTypes } from "../actions/ProjectActions";
import Notification from "../screens/Notification";

const initialState = {
  Dataproject: [],
  dataUnit: [],
  notificationData: [],
  choosedUnit: {}, // more easy & safety null
  choosedCluster: null,
};

const projectReducer = (state = initialState, action) => {
  //console.log("8 reduser project: ", action);
  switch (action.type) {
    case actionTypes.PROJECT_SUCCESS:
      return {
        ...state,
        Dataproject: action.Dataproject,
      };
    case actionTypes.UNIT_SUCCESS:
      return {
        ...state,
        dataUnit: action.dataUnit,
      };
    case actionTypes.CHOOSED_UNIT:
      return {
        ...state,
        choosedUnit: action.choosedUnit,
      };
    case actionTypes.CHOOSED_PROJECT:
      return {
        ...state,
        chooseProject: action.choosedProject,
      };
    case actionTypes.CHOOSED_CLUSTER:
      return {
        ...state,
        choosedCluster: action.choosedCluster,
      };
    case actionTypes.HELPDESK_DOT:
      return {
        ...state,
        helpdesk_dot: action.state,
      };
    case actionTypes.PROJECT_DOT:
      return {
        ...state,
        project_dot: action.state,
      };
    case actionTypes.NOTIFICATION_DATA:
      return {
        ...state,
        notificationData: action.state,
      };
    case actionTypes.NOTIFICATION_DATA_PERSIST:
      return {
        ...state,
        notificationDataPersist: action.state,
      };
    default:
      return state;
  }
};

export default projectReducer;

//actionTypes.UNIT_SUCCESS
