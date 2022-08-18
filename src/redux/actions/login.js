import { AppFlowActions } from '../../constants';

/**
 *
 * @param {*} data
 */
export function loginRequest(data) {
  return ({ type: AppFlowActions.LOGIN_REQUEST, data });
}

export function loginSocialRequest() {
  return ({ type: AppFlowActions.LOGIN_SOCIAL_REQUEST });
}

export function updateProfileRequest(data) {
  return ({ type: AppFlowActions.LOGIN_REQUEST, data });
}

/**
 *
 * @param {*} data
 */
export function logoutRequest() {
  return ({ type: AppFlowActions.LOGOUT_REQUEST });
}
