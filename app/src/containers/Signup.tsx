import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {signupUser} from "../actions";
const styles = require("../stylesheets/Signup.css");

const Container = ({error, dispatch}) => {
  let nameInput, passwordInput;

  return (
      <div className={styles.component}>
        <div>{error}</div>
        <form className={styles.form} onSubmit={e => {
          e.preventDefault()
          dispatch(signupUser({
            name: nameInput.value,
            password: passwordInput.value,
          }));
          nameInput.value = "";
          passwordInput.value = "";
        }}>
          <div>
            <label>User Name</label>
            <input type="text" ref={node => { nameInput = node }}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" ref={node => { passwordInput = node }}/>
          </div>
          <button className={styles.submit} type="submit">Sign up</button>
          or <Link to="/login">Log in</Link>
        </form>
      </div>
  )
}

export const Signup = connect()(Container as any);
