import { put, call, take, fork } from "redux-saga/effects";

//import { LOGIN_URL } from '../../services/config';
import auth from "../../utils/auth";
import { AppFlowActions } from "../../constants";

// import login from '../reducers/login';
import fetchMe from "../../services/apollo/functions/fetchMe";





/**
 * Log in saga
 */

export function* loginRequest(data) {
  const INFINITE = true;
  while (INFINITE) {
    const request = yield take(AppFlowActions.LOGIN_REQUEST);
     //yield put({ type: AppFlowActions.LOADING_COMPLTE, isLoading: true });
     console.log(request)
   

   //const result = yield call(fetchUser, request.data);
   const result = yield call(fetchMe)
    console.log(result)
   
    if (result) {
      auth.login(result);
      yield put({ type: AppFlowActions.LOGIN_COMPLETE, data: result });

      yield put({ type: AppFlowActions.LOADING_COMPLTE, isLoading: false });
    }
  }
}


export default function* loginFlow() {
  yield fork(loginRequest);
}
