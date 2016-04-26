import {User, Backend, JamendoBackend, FsBackend} from "../interfaces";
import * as React from "react";
import {StatelessComponent} from "react";

function backendKey(backend: Backend): string {
  if(typeof (backend as JamendoBackend).jamendo_id === "number") {
    return (backend as JamendoBackend).jamendo_id.toString();
  } else if(typeof (backend as FsBackend).machine_id === "string") {
    return (backend as FsBackend).machine_id;
  }
}

interface BackendListProps {
  user: User;
};

export const BackendList: StatelessComponent<BackendListProps> = ({user}) => (
  <div className="flex justify-center mt2">
    <div className="col-8">
      <div className="h2">Backends</div>
      <ul className="">
        {user.backends.length ? user.backends.map(b =>
          <li key={backendKey(b)}>
            {b.type}
          </li>
        ) : <li>No backends found</li>}
      </ul>
    </div>
  </div>
);
