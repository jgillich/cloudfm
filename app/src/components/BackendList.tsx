import {User} from "../interfaces";
import * as React from "react";
import {StatelessComponent} from "react";

interface BackendListProps {
  user: User;
};

export const BackendList: StatelessComponent<BackendListProps> = ({user}) => (
  <div className="flex justify-center mt2">
    <div className="col-8">
      <div className="h2">Backends</div>
      <ul className="">
        {user.backends.length ? user.backends.map (b =>
          <li key={b.jamendo_id}>{b.type}</li>
        ) : <li>No backends found</li>}
      </ul>
    </div>
  </div>
);
