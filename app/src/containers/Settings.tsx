import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {BackendList} from "../components";
import {AddBackend} from "./";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const Container: StatelessComponent<any> = ({user, dispatch}) => {
  return (
    <div>
      <BackendList user={user}/>
      <AddBackend user={user} dispatch={dispatch}/>
    </div>
  );
};

export const Settings = connect(mapStateToProps, mapDispatchToProps)(Container as any);
