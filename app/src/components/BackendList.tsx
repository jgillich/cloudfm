import * as React from "react";
import {StatelessComponent} from "react";

export const BackendList: StatelessComponent<any> = ({backends}) => (
  <div className="">
    <ul className="">
      {backends.map (b =>
        <li key={b._id}>{b._id}</li>
      )}
    </ul>
  </div>
);
