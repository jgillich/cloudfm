import * as React from "react";
import {StatelessComponent} from "react";
import {Link} from "react-router";

export const SettingsSidebar: StatelessComponent<{}> = () => {
  return (
      <ul className="list-reset mb0 border-right">
        <Link to="/settings/user">
          <li className="px2 py1">
            User
          </li>
        </Link>
        <Link to="/settings/backends">
          <li className="px2 py1">
            Backends
          </li>
        </Link>
      </ul>
  );
};
