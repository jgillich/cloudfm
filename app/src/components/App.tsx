import * as React from "react";
import {StatelessComponent} from "react";
import {Header} from "./";
require("../stylesheets/App.css");

export const App: StatelessComponent<any> = ({children}) => (
  <div className="flex flex-column">
    <Header/>
    <div>{children}</div>
  </div>
);
