import * as React from "react";
import {Component, ReactElement} from "react";
import {connect} from "react-redux";
import {User} from "../interfaces";

interface UserSettingsProps {
  user: User;
}

class UserSettingsComponent extends Component<UserSettingsProps, {}> {

  public props: UserSettingsProps;

  public render(): ReactElement<string> {
      let {user} = this.props;

      return (
      <div>
        Logged in as {user.name}
      </div>
    );
  }
};

export const UserSettings = connect(
  (state) => ({user: state.user})
)(UserSettingsComponent);
