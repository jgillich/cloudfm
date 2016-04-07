import * as React from "react";
import {StatelessComponent} from "react";
import {Link} from "react-router";
const styles = require("../stylesheets/Header.css");
const logo = require("../assets/logo_white.svg");

export const Header: StatelessComponent<any> = () => (
  <div className={styles.component}>

    <div className={styles.nav}>
      <img className={styles.logo} src={logo}/>
      <Link to="/collection" className={styles.navItem}>Collection</Link>
      <Link to="/discover" className={styles.navItem}>Discover</Link>
    </div>
  </div>
);
