import * as React from "react";
import {StatelessComponent} from "react";
const styles = require("../stylesheets/BackendList.css");

export const BackendList: StatelessComponent<any> = ({backends}) => (
  <div className={styles.component}>
    <ul className={styles.trackList}>
      {backends.map (b =>
        <li key={b._id}>{b._id}</li>
      )}
    </ul>
  </div>
);
