import * as React from "react";
import {Component, ReactElement} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {Dispatch, Store} from "redux";
import {User, RouterProps} from "../interfaces";
import {loginUser, signupUser, getUser} from "../actions";
import {Field, Form} from "react-redux-form";
const logo = require("../assets/logo_white.svg");

interface LoginProps {
  user: User;
  dispatch: Dispatch;
  redirectTo: string;
}

export class Login extends Component<LoginProps, {}> {

  public render(): ReactElement<void> {
    let {dispatch, user, redirectTo} = this.props;

    return (
      <div className="flex justify-center items-center flex-auto flex-column">
        <div className="mb2"><img height="128" src={logo}/></div>
        <Form model="user"
          onSubmit={user => dispatch(loginUser(user, redirectTo))}>
          <Field model="user.name">
            <input className="inline-input" type="text"
              placeholder="Username" value={user.name} />
          </Field>
          <Field model="user.password">
            <input className="inline-input" type="password"
              placeholder="Password" />
          </Field>
          <button className="btn btn-outline" type="submit">
            Log in
          </button>
        </Form>
        <div className="my2"><Link to="/signup">Sign up</Link></div>
      </div>
    );
  }
};

export const LoginContainer = connect(
  (state, ownProps: RouterProps) => ({
    redirectTo: (ownProps.location as any).query.redirectTo || "/",
    user: state.user,
  }),
  (dispatch) => ({dispatch})
)(Login);

interface SignupProps {
  dispatch: Dispatch;
  redirectTo: string;
}

export class Signup extends Component<SignupProps, {}> {

  public render(): ReactElement<void> {
    let {dispatch, redirectTo} = this.props;

    return (
      <div className="flex justify-center items-center flex-auto flex-column">
        <div className="mb2"><img height="128" src={logo}/></div>
        <Form model="user" className="center"
          onSubmit={user => dispatch(signupUser(user, redirectTo))}>
          <Field model="user.name">
            <input className="input" type="text"
              placeholder="Username" />
          </Field>
          <Field model="user.password">
            <input className="input" type="password"
              placeholder="Password" />
          </Field>
          <Field model="user.email">
            <input className="input" type="email"
              placeholder="Email" />
          </Field>
          <button className="btn btn-outline" type="submit">
            Sign up
          </button>
        </Form>
        <div className="my2"><Link to="/login">Log in</Link></div>
      </div>
    );
  }
};

export const SignupContainer = connect(
  (state, ownProps: RouterProps) => ({
    redirectTo: (ownProps.location as any).query.redirectTo || "/",
  }),
  (dispatch) => ({dispatch})
)(Signup);

interface UserSettingsProps {
  user: User;
  getUser: (user: User) => void;
}

export class UserSettings extends Component<UserSettingsProps, {}> {

  public props: UserSettingsProps;

  public constructor(props: UserSettingsProps) {
    super(props);

    // When the user settings are loaded, we fetch the user once to make sure
    // our local data is up to date.
    this.props.getUser(this.props.user);
  }

  public render(): ReactElement<string> {
    let {user} = this.props;

    return (
      <div>
        Logged in as {user.name}
      </div>
    );
  }
};

export const UserSettingsContainer = connect(
  (state) => ({user: state.user}),
  (dispatch) => ({getUser: (user: User): void => dispatch(getUser(user))})
)(UserSettings);
