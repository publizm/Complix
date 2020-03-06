import { put, call, takeLatest } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
import AuthService from '../../service/AuthService';
import { push } from 'connected-react-router';

const options = {
  prefix: 'COMPLIX/AUTH',
};

const initialState = {
  token: null,
  loading: true,
  error: null,
  feedVisible: false,
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: token => ({ token }),
  },
  'PENDING',
  'FAIL',
  options,
);

const auth = handleActions(
  {
    PENDING: (state, action) => ({
      token: state.token ? state.token : null,
      loading: true,
      error: null,
      feedVisible: false,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload.token,
      loading: false,
      error: null,
      feedVisible: false,
    }),
    FAIL: (state, action) => ({
      token: null,
      loading: false,
      error: action.payload,
      feedVisible: true,
    }),
  },
  initialState,
  options,
);

function* signIn(action) {
  try {
    yield put(pending());
    const res = yield call(AuthService.signIn, action.payload);

    const { access_token } = res.data;

    yield put(success(access_token));
    localStorage.setItem('token', access_token);
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* signOut() {
  try {
    yield put(pending());
    yield put(success(null));
    localStorage.removeItem('token');
  } catch (error) {
    yield put(fail(error));
  }
}

export const signInSaga = createAction('SIGN_IN_SAGA');
export const signOutSaga = createAction('SIGN_OUT_SAGA');

export function* authSaga() {
  yield takeLatest('SIGN_IN_SAGA', signIn);
  yield takeLatest('SIGN_OUT_SAGA', signOut);
}

export default auth;
