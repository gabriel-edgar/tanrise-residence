import {actionTypes} from '../actions/NotifActions';

const initialState = {
  notifDataRed: [],
  notifDataRedCount: 0,
};

const notifReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFIKASI_NBADGE:
      return {
        ...state,
      };
    case actionTypes.NOTIFIKASI_NBADGE_SUCCESS:
      return {
        ...state,
        notifDataRed: action.notifDataRed,
        // notifDataRedCount: action.notifDataRed.length,
      };
    case actionTypes.NOTIFIKASI_NBADGE_DECREASE:
      return {
        ...state,
        // notifDataRed: action.notifDataRed,
        notifDataRedCount: action.notifDataRed.length - 1,
      };
    case actionTypes.NOTIFIKASI_NBADGE_COUNT_DECREASE:
      return {
        ...state,
        // notifDataRed: action.notifDataRed,
        notifDataRedCount: action.notifDataRed.length - 1,
      };
    default:
      return state;
  }
};

export default notifReducer;
