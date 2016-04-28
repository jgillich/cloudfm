import * as React from "react";
import {StatelessComponent, Component} from "react";
import {SettingsSidebar} from "../components";
import {connect} from "react-redux";

interface SettingsProps {
  /* tslint:disable:no-any */
  children: Component<any, any>;
  /* tslint:enable */
  active: string;
};

export const SettingsComponent: StatelessComponent<SettingsProps> =
({children, active}) => (
  <div className="flex flex-auto">
    <SettingsSidebar active={active}/>
    <div className="flex flex-auto overflow-y-scroll flex-column px2 py2">
      {children}
    </div>
  </div>
);

export const Settings = connect(
  (state, ownProps) => ({
    active: (ownProps as any).location.pathname.split("/").pop(),
  })
)(SettingsComponent);

