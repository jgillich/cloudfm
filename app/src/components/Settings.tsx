import * as React from "react";
import {StatelessComponent, Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {RouterProps} from "../interfaces";

interface SettingsSidebarProps {
  active: string;
};

export const SettingsSidebar: StatelessComponent<SettingsSidebarProps> =
({active}) => (
  <ul className="list-reset mb0 overflow-y-scroll">
    <Link to="/settings/user">
      <li
        className={"px2 py1 black" +
        (["user", "settings"].includes(active) ? " bg-aqua" : "")}>
        User
      </li>
    </Link>
    <Link to="/settings/backends">
      <li className={"px2 py1 black" +
      (active === "backends" ? " bg-aqua" : "")}>
        Backends
      </li>
    </Link>
  </ul>
);

interface SettingsProps {
  children: Component<void, void>;
  active: string;
};

export const Settings: StatelessComponent<SettingsProps> =
({children, active}) => (
  <div className="flex flex-auto">
    <SettingsSidebar active={active}/>
    <div className="flex flex-auto overflow-y-scroll flex-column px2 py2">
      {children}
    </div>
  </div>
);

export const SettingsContainer = connect(
  (state, ownProps: RouterProps) => ({
    active: ownProps.location.pathname.split("/").pop(),
  })
)(Settings);

