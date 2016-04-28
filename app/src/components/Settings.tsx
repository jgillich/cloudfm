import * as React from "react";
import {StatelessComponent, Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

interface SettingsSidebarProps {
  active: string;
};

export const SettingsSidebar: StatelessComponent<SettingsSidebarProps> =
({active}) => (
  <ul className="list-reset mb0 overflow-y-scroll">
    <Link to="/settings/user">
      <li className={"px2 py1 black" + (active === "user" || active === "settings" ? " bg-aqua" : "")}>
        User
      </li>
    </Link>
    <Link to="/settings/backends">
      <li className={"px2 py1 black" + (active === "backends" ? " bg-aqua" : "")}>
        Backends
      </li>
    </Link>
  </ul>
);

interface SettingsProps {
  /* tslint:disable:no-any */
  children: Component<any, any>;
  /* tslint:enable */
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
  (state, ownProps) => ({
    active: (ownProps as any).location.pathname.split("/").pop(),
  })
)(Settings);

