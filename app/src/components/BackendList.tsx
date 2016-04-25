import {User} from "../interfaces";
import * as React from "react";
import {StatelessComponent} from "react";

interface BackendListProps {
  user: User;
};

export const BackendList: StatelessComponent<BackendListProps> = ({user}) => (
  <div className="">
    <ul className="">
      {user.backends.map (b =>
        <li key={b.type}>{b.type}</li>
      )}
    </ul>
  </div>
);
