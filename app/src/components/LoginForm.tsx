import * as React from "react";
import { Component, StatelessComponent } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router";
const styles = require("../stylesheets/Login.css");

class FormComponent extends Component<any, any> {
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
          <button className={styles.submit} type="submit">Log in</button> or <Link to="/signup">Sign up</Link>
        </form>
      </div>
    );
  }
};

const Form = reduxForm({
  form: 'signup',
  fields: ['name', 'password']
})(FormComponent);

export const LoginForm: StatelessComponent<any> = ({ error, user, submit }) => (
  <div className={styles.component}>
    <div className={styles.inner}>
      <div>{error}</div>
      <Form onSubmit={submit} initialState={user}/>
    </div>
  </div>
);
