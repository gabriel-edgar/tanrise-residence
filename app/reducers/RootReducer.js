import {combineReducers} from 'redux';
import error from './ErrorReducer';
import user from './UserReducer';
import status from './StatusReducer';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import notifDataRed from './NotifReducer';
import counter from './reduceNotif';
import apiReducer from '../config/ApiReducer';
import Dataproject from './ProjectReducer';
import DataCart from './cartReducer';

const rootReducer = combineReducers({
  error,
  user,
  status,
  auth: AuthReducer,
  application: ApplicationReducer,
  notifDataRed,
  counter,
  apiReducer,
  Dataproject,
  DataCart,
});

export default rootReducer;
