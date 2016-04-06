import * as React from "react";
import { Component } from "react";
import { reduxForm } from "redux-form";
const styles = require("../stylesheets/Signup.css");

export class Signup extends Component<any, any> {
  public render() {
    const {name, password, email, onSignupClick} = this.props;
    return (
      <div className={styles.component}>
        <form className={styles.form} onSubmit={onSignupClick}>
          <div>
            <label>User Name</label>
            <input type="text" {...name}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...password}/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" {...email}/>
          </div>
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    );
  }
};
