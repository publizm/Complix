import { connect } from 'react-redux';
import Result from '../pages/Result';
import { searchMediaSaga, renderSearchSaga } from '../redux/modules/media';

export default connect(
  state => ({
    query: state.media.searched.query,
    searchList: state.media.searched.results,
    pageIndex: state.media.searched.page,
  }),
  dispatch => ({
    searchMedia: query => {
      dispatch(searchMediaSaga(query));
    },
    renderSearch: query => {
      dispatch(renderSearchSaga(query));
    },
  }),
)(Result);
