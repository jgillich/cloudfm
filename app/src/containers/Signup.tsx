import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router";
import {signupUser} from "../actions";

interface SignupProps {
  error: string;
  dispatch: Dispatch;
};

const Container: StatelessComponent<SignupProps> = ({error, dispatch}) => {
  let nameInput, passwordInput, emailInput;

  return (
    <form className="flex flex-column items-center justify-center pt4" onSubmit={e => {
      e.preventDefault();
        dispatch(signupUser({
          email: emailInput.value,
          name: nameInput.value,
          password: passwordInput.value,
        }));
        nameInput.value = "";
        passwordInput.value = "";
      }}>
        <div className="flex md-col-6">
          <label className="label mr2">User Name</label>
          <input className="input" type="text" ref={node => { nameInput = node; }}/>
        </div>
        <div className="flex md-col-6">
          <label className="label mr2">Password</label>
          <input className="input" type="password" ref={node => { passwordInput = node; }}/>
        </div>
        <div className="flex md-col-6">
          <label className="label mr2">Email</label>
          <input className="input" type="email" ref={node => { emailInput = node; }}/>
        </div>
        <div className="flex md-col-6 justify-center">
          <span className="mr1">
            <button className="btn btn-outline blue" type="submit">Sign up</button>
          </span>
          <Link className="btn btn-outline" to="/login">Login</Link>
        </div>
        <div className="flex md-col-6 red justify-center pt2">{error}</div>
      </form>
  );
};

export const Signup = connect(
  state => ({error: state.error})
)(Container);
