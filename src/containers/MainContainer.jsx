import { connect } from 'react-redux';
import Main from '../pages/Main';
import { getMainMediaSaga } from '../redux/modules/media';

export default connect(
  state => ({
    newMovie: state.media.newMovie,
    newTv: state.media.newTv,
    trending: state.media.trending,
    popularTv: state.media.popularTv,
    popularMovie: state.media.popularMovie,
    selectCategory: state.media.selected.category,
  }),
  dispatch => ({
    getMainMedia: () => {
      dispatch(getMainMediaSaga());
    },
  }),
)(Main);
