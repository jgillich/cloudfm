import * as React from "react";
import {Component, ReactElement} from "react";
import {connect} from "react-redux";
import {User} from "../interfaces";
import {loginUser, signupUser} from "../actions";
import {Field, Form} from "react-redux-form";

interface LoginProps {
  user: User;
  handleSubmit: (user: User) => void;
}

export class Login extends Component<LoginProps, {}> {

  public render(): ReactElement<string> {
      let { user, handleSubmit } = this.props;

      return (
        <Form model="user"
          onSubmit={user => handleSubmit(user) }>
          <Field model="user.name">
            <input className="input" type="text"
              placeholder="Username" value={user.name} />
          </Field>
          <Field model="user.password">
            <input className="input" type="password"
              placeholder="Password" />
          </Field>
          <button className="btn btn-outline" type="submit">
            Submit
          </button>
        </Form>
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
        <Form model="user"
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
            Submit
          </button>
        </Form>
    );
  }
};

export const SignupContainer = connect(
  () => ({}),
  (dispatch) => ({
    handleSubmit: (user: User): void => dispatch(signupUser(user)),
  })
)(Login);

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
