import * as React from "react";
import {connect} from "react-redux";
import {loginUser} from "../actions";
import {Link} from "react-router";

const Container = ({error, dispatch}) => {
  let nameInput, passwordInput;

  return (
      <div className="">
        <div>{error}</div>
        <form className="" onSubmit={e => {
          e.preventDefault();
          dispatch(loginUser({
            name: nameInput.value,
            password: passwordInput.value,
          }));
          nameInput.value = "";
          passwordInput.value = "";
        }}>
          <div>
            <label>User Name</label>
            <input type="text" ref={node => { nameInput = node; }}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" ref={node => { passwordInput = node; }}/>
          </div>
          <button className="" type="submit">Log in</button>
          or <Link to="/signup">Sign up</Link>
        </form>
      </div>
  );
};

export const Login = connect()(Container as any);
