import * as React from "react";
import {Component, ReactElement} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {User} from "../interfaces";
import {loginUser, signupUser} from "../actions";
import {Field, Form} from "react-redux-form";
const logo = require("../assets/logo_white.svg");

interface LoginProps {
  user: User;
  handleSubmit: (user: User) => void;
}

export class Login extends Component<LoginProps, {}> {

  public render(): ReactElement<string> {
      let { user, handleSubmit } = this.props;

      return (
        <div className="flex justify-center items-center flex-auto flex-column">
          <div className="mb2"><img height="128" src={logo}/></div>
          <Form model="user"
            onSubmit={user => handleSubmit(user) }>
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
  ({user}) => ({user}),
  (dispatch) => ({
    handleSubmit: (user: User): void => dispatch(loginUser(user)),
  })
)(Login);

interface SignupProps {
  handleSubmit: (user: User) => void;
}

export class Signup extends Component<SignupProps, {}> {

  public render(): ReactElement<string> {
      let { handleSubmit } = this.props;

      return (
        <div className="flex justify-center items-center flex-auto flex-column">
          <div className="mb2"><img height="128" src={logo}/></div>
          <Form model="user" className="center"
            onSubmit={user => handleSubmit(user) }>
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
  () => ({}),
  (dispatch) => ({
    handleSubmit: (user: User): void => dispatch(signupUser(user)),
  })
)(Signup);

interface UserSettingsProps {
  user: User;
}

export class UserSettings extends Component<UserSettingsProps, {}> {

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

export const UserSettingsContainer = connect(
  (state) => ({user: state.user})
)(UserSettings);
