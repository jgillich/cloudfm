import { connect } from "react-redux";
import { Signup } from "../components/Signup";
import { loginUser, signupUser } from "../actions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (user) => dispatch(signupUser(user)),
  };
};

export const Authentication = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
