import { connect } from 'react-redux';
import { signInSaga } from '../redux/modules/auth';
import SigninForm from '../components/SigninForm';

export default connect(
  state => ({
    feedVisible: state.auth.feedVisible,
  }),
  dispatch => ({
    signIn: info => {
      dispatch(signInSaga(info));
    },
  }),
)(SigninForm);
