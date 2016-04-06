import * as React from "react";
import { StatelessComponent } from "react";
import { Header } from "./";
import { Player } from "../containers";
const styles = require("../stylesheets/App.css");

export const App: StatelessComponent<any> = ({children}) => (
  <div className={styles.component}>
    <Header/>
    {children}
  </div>
);
