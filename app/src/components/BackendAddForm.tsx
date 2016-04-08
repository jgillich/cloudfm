import * as React from "react";
import {Component, StatelessComponent} from "react";
import {reduxForm} from "redux-form";
import {Link} from "react-router";
const styles = require("../stylesheets/BackendAddForm.css");

class FormComponent extends Component<any, any> {
  public render() {
    const {fields: {owner, path}, handleSubmit} = this.props;
    return (
      <div className={styles.component}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label>Owner</label>
            <input type="text" {...owner}/>
          </div>
          <div>
            <label>Path</label>
            <input type="text" {...path}/>
          </div>
          <button className={styles.submit} type="submit">Add</button>
        </form>
      </div>
    );
  }
};

export const BackendAddForm = reduxForm({
  fields: ["owner", "path"],
  form: "signup",
})(FormComponent);
