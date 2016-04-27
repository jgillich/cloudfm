import * as React from "react";
import {StatelessComponent, Component} from "react";
import {SettingsSidebar} from "../components";

interface SettingsProps {
  /* tslint:disable:no-any */
  children: Component<any, any>;
  /* tslint:enable */
};

export const Settings: StatelessComponent<SettingsProps> = ({children}) => {
  return (
    <div className="flex flex-auto">
      <SettingsSidebar/>
      <div className="flex flex-auto overflow-y-scroll flex-column px2 py2">
        {children}
      </div>
    </div>
  );
};
