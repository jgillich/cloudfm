import * as React from "react";
import { Component } from "react";
import { reduxForm } from "redux-form";
const styles = require("../stylesheets/Login.css");

class LoginComponent extends Component<any, any> {
  public render() {
    const {fields: {name, password}, handleSubmit} = this.props;
    return (
      <div className={styles.component}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label>User Name</label>
            <input type="text" {...name}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...password}/>
          </div>
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    );
  }
};

export const Login = reduxForm({
  form: 'signup',
  fields: ['name', 'password']
})(LoginComponent);
