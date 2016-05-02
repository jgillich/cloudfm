import * as React from "react";
import {Component} from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {Header, PlayerContainer} from "../components";
import {User} from "../interfaces";
require("../stylesheets/App.css");

interface AppProps {
  children: Component<void, void>;
  user: User;
};

export const App: StatelessComponent<AppProps> = ({children, user}) => (
  <div className="flex flex-column absolute"
    style={{height: "100%", width: "100%"}}>
    {user.loggedIn ? <Header/> : null}
    {children}
    {user.loggedIn ? <PlayerContainer/> : null}
  </div>
);

export const AppContainer = connect(
  ({user}) => ({user})
)(App);
