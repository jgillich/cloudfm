import * as React from "react";
import {StatelessComponent} from "react";
import {Link} from "react-router";

interface SettingsSidebarProps {
  active: string;
};

export const SettingsSidebar: StatelessComponent<SettingsSidebarProps> =
({active}) => (
  <ul className="list-reset mb0 overflow-y-scroll">
    <Link to="/settings/user">
      <li className={"px2 py1" + (active === "user" || active === "settings" ? " bg-aqua" : "")}>
        User
      </li>
    </Link>
    <Link to="/settings/backends">
      <li className={"px2 py1" + (active === "backends" ? " bg-aqua" : "")}>
        Backends
      </li>
    </Link>
  </ul>
);
