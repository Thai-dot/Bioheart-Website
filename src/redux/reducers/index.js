import { combineReducers } from 'redux';
import initialState from './initialState';
import auth from '../../utils/auth';
import { AppFlowActions } from '../../constants';
import login from './login';
import { Auth } from '@aws-amplify/auth';
import { browserHistory } from 'react-router'


const appReducer = combineReducers({
  login,
});



 function rootReducer(state, action) {

  if (action.type === AppFlowActions.LOGOUT_REQUEST) {
   
    auth.logout();
    Auth.signOut({ global: true });
    window.location.href = "/login";
    
    return initialState;
  }
 
  return appReducer(state, action);
}

export default rootReducer;
