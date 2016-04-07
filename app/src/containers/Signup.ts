import {connect} from "react-redux";
import {SignupForm} from "../components/SignupForm";
import {signupUser} from "../actions";

const mapStateToProps = (state) => {
  return {
    error: state.error,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (user) => dispatch(signupUser(user)),
  };
};

export const Signup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm as any);
