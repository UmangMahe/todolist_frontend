import { all } from 'redux-saga/effects';
import Auth from './Auth';

export default function* rootSaga() {
  yield all([
    Auth(),
  ]);
}
