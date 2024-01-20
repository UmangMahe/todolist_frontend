import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  AUTH_TOKEN,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  USER_INFO,
} from "../constants/Auth";
import {
  showAuthMessage,
  authenticated,
  signOutSuccess,
  signUpSuccess,
  authFailed,
} from "../actions/Auth";
import JwtAuthService from "../../services/JwtAuthService";
import { MSG_VARIABLE } from "../../constants/ErrorConstants";

export function* signInWithEmail() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    const { email } = payload;
    try {
      const user = yield call(JwtAuthService.login, email);

      if (user.access_token && user.user) {
        localStorage.setItem(AUTH_TOKEN, user.access_token);
        localStorage.setItem(USER_INFO, JSON.stringify(user.user));
        yield put(authenticated(user.access_token, user.user));
      }
    } catch (err) {
      yield put(authFailed());
      if (err.response) {
        yield put(showAuthMessage(err.response?.data[MSG_VARIABLE]));
      }
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      yield put(signOutSuccess("Logout Successful"));
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USER_INFO);
    } catch (err) {
      yield put(authFailed());
    }
  });
}

export function* signUpWithEmail() {
  yield takeEvery(SIGNUP, function* ({ payload }) {
    try {
      const user = yield call(JwtAuthService.signUp, payload);

      if (user) {
        yield put(signUpSuccess('Registered Successfully'));
      }
    } catch (err) {
      yield put(authFailed());
      if (err.response) {
        yield put(showAuthMessage(err.response?.data[MSG_VARIABLE]));
      }
    }
  });
}

export default function* rootSaga() {
  yield all([fork(signInWithEmail), fork(signOut), fork(signUpWithEmail)]);
}
