import * as React from "react";
import { StatelessComponent } from "react";
import { VisibleTrackList, Player } from "../containers";

export const Collection: StatelessComponent<any> = ({children}) => (
  <div>
    <VisibleTrackList/>
    <Player/>
  </div>
);
