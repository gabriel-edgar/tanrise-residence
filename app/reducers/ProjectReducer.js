import {actionTypes} from '../actions/ProjectActions';

const initialState = {
  Dataproject: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROJECT_SUCCESS:
      return {
        ...state,
        Dataproject: action.Dataproject,
      };

    default:
      return state;
  }
};

export default projectReducer;
