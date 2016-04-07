import * as React from "react";
import { Component, StatelessComponent } from "react";
import { reduxForm } from "redux-form";
const styles = require("../stylesheets/Signup.css");

class SignupFormComponent extends Component<any, any> {
  public render() {
    const {fields: {name, password, email}, handleSubmit} = this.props;
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
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
    );
  }
};

const SignupForm = reduxForm({
  form: "signup",
  fields: ["name", "password", "email"]
})(SignupFormComponent as any);

export const Signup: StatelessComponent<any> = ({ error, user, signupSubmit }) => (
  <div className={styles.component}>
    <div>{error}</div>
    <SignupForm onSubmit={signupSubmit} initialState={user}/>
  </div>
);
