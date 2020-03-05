import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import media from './media';

const reducer = history =>
  combineReducers({
    auth,
    media,
    router: connectRouter(history),
  });

export default reducer;
