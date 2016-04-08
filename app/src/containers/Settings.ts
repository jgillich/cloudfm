import {connect} from "react-redux";
import {BackendList} from "../components";
import {insertBackend} from "../actions";

const mapStateToProps = (state) => {
  return {
    backends: state.backends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (backend) => dispatch(insertBackend(backend)),
  };
};

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(BackendList as any);
