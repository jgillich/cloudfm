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

const Container: StatelessComponent<SettingsProps> = ({user}) => {
  return (
    <div className="flex justify-center flex-column">
      <div className="flex justify-center mt2">
        <div className="col-8">Logged in as: {user.name}</div>
      </div>
      <BackendList user={user}/>
      <AddBackend/>
    </div>
  );
};

export const Settings = connect(
  state => ({user: state.user})
)(Container);
