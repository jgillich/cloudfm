import * as React from "react";
import { StatelessComponent } from "react";
const styles = require("../stylesheets/Player.css");

const Player: StatelessComponent<any> = ({ src }) => (
  <div className={styles.component}>
    <audio src={src} autoPlay={true} />
  </div>
);

export default Player;
