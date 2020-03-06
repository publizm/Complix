import { connect } from 'react-redux';
import Result from '../pages/Result';

export default connect(state => ({
  query: state.media.searched.query,
  searchList: state.media.searched.results,
  pageIndex: state.media.searched.page,
}))(Result);
