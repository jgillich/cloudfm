import * as React from "react";
import {Component} from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {Header, PlayerContainer} from "../components";
import {User} from "../interfaces";
require("../stylesheets/App.css");

interface AppProps {
  /* tslint:disable:no-any */
  children: Component<any, any>;
  /* tslint:enable */
  user: User;
};

export const App: StatelessComponent<AppProps> = ({children, user}) => (
  <div className="flex flex-column absolute"
    style={{height: "100%", width: "100%"}}>
    {user.logged_in ? <Header/> : null}
    {children}
    {user.logged_in ? <PlayerContainer/> : null}
  </div>
);

export const AppContainer = connect(
  ({user}) => ({user})
)(App);
