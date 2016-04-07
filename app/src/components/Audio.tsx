import * as React from "react";
import {StatelessComponent} from "react";
const styles = require("../stylesheets/Player.css");

interface PropTypes {
  src: string;
};

export const Audio: StatelessComponent<PropTypes> = ({src}) => (
  <div className={styles.component}>
    <div className={styles.player}>
      <audio src={src} autoPlay={true} controls={true} />
    </div>
  </div>
);
