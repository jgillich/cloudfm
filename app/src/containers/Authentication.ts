import { connect } from "react-redux";
import { Signup } from "../components/Signup";
import { loginUser, signupUser } from "../actions";

const mapStateToProps = (state) => {
  return {
    error: state.error,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupSubmit: (user) => dispatch(signupUser(user)),
  };
};

export const Authentication = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup as any);
