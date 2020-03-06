import { select, put, call, takeLatest } from 'redux-saga/effects';
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
  feedMessage: null,
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
      feedMessage: null,
      feedVisible: false,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload.token,
      loading: false,
      error: null,
      feedMessage: null,
      feedVisible: false,
    }),
    FAIL: (state, action) => ({
      token: null,
      loading: false,
      error: action.payload,
      feedMessage: action.payload.response.data.error,
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
    const { token } = res.data;
    yield put(success(token));
    localStorage.setItem('token', token);
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* signOut() {
  const token = yield select(state => state.auth.token);

  try {
    yield put(pending());
    yield call(AuthService.signOut, token);
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
