import { select, put, call, takeLatest } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
import MediaService from '../../service/MediaService';

const options = {
  prefix: 'COMPLIX/MEDIA',
};

const initialState = {
  loading: false,
  error: null,
  selected: {
    selectId: null,
    selectCategory: null,
  },
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: media => ({ media }),
  },
  'PENDING',
  'FAIL',
  options,
);

const media = handleActions(
  {
    PENDING: (state, action) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => {
      return {
        ...state,
        ...action.payload.media,
        loading: false,
        error: null,
      };
    },
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

function* getNewMovie() {
  try {
    yield put(pending());
    const { data } = yield call(MediaService.newMovie);
    yield put(success({ newMovie: data.results }));
  } catch (error) {
    yield put(fail(error));
  }
}

function* getNewTv() {
  try {
    yield put(pending());
    const { data } = yield call(MediaService.newTv);
    yield put(success({ newTv: data.results }));
  } catch (error) {
    yield put(fail(error));
  }
}

function* getTrending() {
  try {
    yield put(pending());
    const { data } = yield call(MediaService.trending);
    yield put(success({ trending: data.results }));
  } catch (error) {
    yield put(fail(error));
  }
}

function* getPopularTv() {
  try {
    yield put(pending());
    const { data } = yield call(MediaService.popularTv);
    yield put(success({ popularTv: data.results }));
  } catch (error) {
    yield put(fail(error));
  }
}

function* getPopularMovie() {
  try {
    yield put(pending());
    const { data } = yield call(MediaService.popularMovie);
    yield put(success({ popularMovie: data.results }));
  } catch (error) {
    yield put(fail(error));
  }
}

export const getMainMediaSaga = createAction('GET_MAIN_MEDIA_SAGA');

function* fetchMedia() {
  yield call(getNewMovie, 'payload');
  yield call(getNewTv, 'payload');
  yield call(getTrending, 'payload');
  yield call(getPopularTv, 'payload');
  yield call(getPopularMovie, 'payload');
}

function* getMainMedia() {
  yield call(fetchMedia);
}

export const selectMediaSaga = createAction('SELECT_MEDIA_SAGA');

function* selectMedia({ payload }) {
  const prevSelectId = yield select(state => state.media.selected.id);
  const prevSelectCategory = yield select(
    state => state.media.selected.category,
  );
  const { id, category } = payload;

  try {
    yield put(pending());

    if (prevSelectId === id && prevSelectCategory === category) {
      yield put(success({ selected: { id: null, category: null } }));
    } else {
      yield put(success({ selected: { ...payload } }));
    }
  } catch (error) {
    yield put(fail(error));
  }
}

export function* mediaSaga() {
  yield takeLatest('GET_MAIN_MEDIA_SAGA', getMainMedia);
  yield takeLatest('SELECT_MEDIA_SAGA', selectMedia);
}

export default media;
