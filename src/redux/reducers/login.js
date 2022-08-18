import { AppFlowActions } from "../../constants";
import initialState from "./initialState";
import auth from "../../utils/auth"
import _ from "lodash"

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case AppFlowActions.LOGIN_COMPLETE:
      return action.data;
    case AppFlowActions.UPDATE_PROFILE_REQUEST:
      {

       auth.updateProfile(action.data)
       return action.data
      }
    case AppFlowActions.LOGOUT_COMPLETE:
      return action;
    default:
      return state;
  }
};

export default loginReducer;
