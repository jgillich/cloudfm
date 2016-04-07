import { connect } from "react-redux";
import { LoginForm } from "../components/LoginForm";
import { loginUser, signupUser } from "../actions";

const mapStateToProps = (state) => {
  return {
    error: state.error,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (user) => dispatch(loginUser(user)),
  };
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm as any);
