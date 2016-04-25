import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {BackendList} from "../components";
import {User} from "../interfaces";
import {AddBackend} from "./";

interface SettingsProps {
  user: User;
  dispatch: Dispatch;
};

const Container: StatelessComponent<SettingsProps> = ({user, dispatch}) => {
  return (
    <div>
      <BackendList user={user}/>
      <AddBackend user={user} dispatch={dispatch}/>
    </div>
  );
};

export const Settings = connect(
  state => ({user: state.user}),
  dispatch => ({dispatch})
)(Container);
