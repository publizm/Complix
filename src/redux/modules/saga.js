import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { mediaSaga } from './media';

export default function* rootSaga() {
  yield all([authSaga(), mediaSaga()]);
}
