import * as React from "react";
import {StatelessComponent} from "react";
import {BackendAddForm} from "./";
const styles = require("../stylesheets/BackendList.css");

export const BackendList: StatelessComponent<any> = ({backends, submit}) => (
  <div className={styles.component}>
    <ul className={styles.trackList}>
      {backends.map (b =>
        <li key={b._id}>{b._id}</li>
      )}
    </ul>
    <div>
      Add fs backend:
      <BackendAddForm onSubmit={submit}/>
    </div>

  </div>
);
