import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {BackendList, SettingsSidebar} from "../components";
import {User} from "../interfaces";
import {AddBackend} from "./";

interface SettingsProps {
  user: User;
  dispatch: Dispatch;
};

const Container: StatelessComponent<SettingsProps> = ({user}) => {
  return (
    <div className="flex flex-auto">
      <SettingsSidebar/>
      <div className="flex flex-column px2 py2 lg-col-8">
        <BackendList user={user}/>
        <AddBackend/>
      </div>
    </div>
  );
};

export const Settings = connect(
  state => ({user: state.user})
)(Container);
