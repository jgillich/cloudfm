import * as React from "react";
import { StatelessComponent } from "react";
const styles = require("../stylesheets/Header.css");
const logo = require("../assets/logo_white.svg");

export const Header: StatelessComponent<any> = () => (
  <div className={styles.component}>

    <div className={styles.nav}>
      <img className={styles.logo} src={logo}/>
      <div className={styles.navItem}>Collection</div>
      <div className={styles.navItem}>Discover</div>
    </div>
  </div>
);
