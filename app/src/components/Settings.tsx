import * as React from "react";
import {StatelessComponent, Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

interface SettingsSidebarProps {
};

export const SettingsSidebar: StatelessComponent<SettingsSidebarProps> =
  () => (
    <div className="mb0 overflow-y-scroll">
      <div>
        <Link className="btn" to="/settings/user" activeClassName="red">
          User
        </Link>
      </div>
      <div>
        <Link className="btn" to="/settings/backends" activeClassName="red">
          Backends
        </Link>
      </div>
    </div>
  );

interface SettingsProps {
  children: Component<void, void>;
  active: string;
};

export const Settings: StatelessComponent<SettingsProps> =
  ({children, active}) => (
    <div className="flex flex-auto">
      <SettingsSidebar/>
      <div className="flex flex-auto overflow-y-scroll flex-column px2 py2">
        {children}
      </div>
    </div>
  );

export const SettingsContainer = connect()(Settings);
