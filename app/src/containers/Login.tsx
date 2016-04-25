import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {loginUser} from "../actions";
import {Link} from "react-router";

interface LoginProps {
  error: string;
  dispatch: Dispatch;
};

const Container: StatelessComponent<LoginProps> = ({error, dispatch}) => {
  let nameInput, passwordInput;

  return (
      <form className="flex flex-column items-center pt4" onSubmit={e => {
        e.preventDefault();
        dispatch(loginUser({
          name: nameInput.value,
          password: passwordInput.value,
        }));
        nameInput.value = "";
        passwordInput.value = "";
      }}>
        <div className="flex md-col-6 items-center">
          <label className="label mr2">User Name</label>
          <input className="input" type="text" ref={node => { nameInput = node; }}/>
        </div>
        <div className="flex md-col-6 items-center">
          <label className="label mr2">Password</label>
          <input className="input" type="password" ref={node => { passwordInput = node; }}/>
        </div>
        <div className="flex md-col-6 justify-center">
          <span className="mr1">
            <button className="btn btn-outline blue" type="submit">Log in</button>
          </span>
          <Link className="btn btn-outline" to="/signup">Sign up</Link>
        </div>
        <div className="flex md-col-6 red justify-center pt2">{error}</div>
      </form>
  );
};

export const Login = connect(
  state => ({error: state.error})
)(Container);
