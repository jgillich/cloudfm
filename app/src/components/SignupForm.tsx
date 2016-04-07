import * as React from "react";
import {Component, StatelessComponent} from "react";
import {reduxForm} from "redux-form";
import {Link} from "react-router";
const styles = require("../stylesheets/Signup.css");

class FormComponent extends Component<any, any> {
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
        <button className={styles.submit} type="submit">Sign up</button>
        or <Link to="/">Log in</Link>
      </form>
    );
  }
};

const Form = reduxForm({
  fields: ["name", "password", "email"],
  form: "signup",
})(FormComponent as any);

export const SignupForm: StatelessComponent<any> = ({error, user, submit}) => (
  <div className={styles.component}>
    <div className={styles.inner}>
      <div>{error}</div>
      <Form onSubmit={submit} initialState={user}/>
    </div>
  </div>
);
