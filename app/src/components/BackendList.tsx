import {User} from "../interfaces";
import * as React from "react";
import {StatelessComponent} from "react";

interface PropTypes {
  user: User;
};

export const BackendList: StatelessComponent<any> = ({user}) => (
  <div className="">
    <ul className="">
      {user.backends.map (b =>
        <li key={b.type}>{b.type}</li>
      )}
    </ul>
  </div>
);
