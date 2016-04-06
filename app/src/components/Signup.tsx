import * as React from "react";
import { Component } from "react";
import { reduxForm } from 'redux-form';
const styles = require("../stylesheets/Login.css");

export class Signup extends Component<any, any> {
  render() {
    const {name, password, email, onSignupClick} = this.props;
    return (
      <div className={styles.component}>
        <form onSubmit={onSignupClick}>
          <div>
            <label>User Name</label>
            <input type="text" placeholder="First Name" {...name}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...password}/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Email" {...email}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
};
