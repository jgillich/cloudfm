import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {BackendList} from "../components";
import {AddBackend} from "./";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const Container: StatelessComponent<any> = ({backends, dispatch}) => {
  return (
    <div>
      <BackendList backends={backends}/>
      <AddBackend dispatch={dispatch}/>
    </div>
  );
};

export const Settings = connect(mapStateToProps, mapDispatchToProps)(Container as any);
