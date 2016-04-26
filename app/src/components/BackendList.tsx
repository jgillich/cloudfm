import {User, Backend, isJamendoBackend, isFileBackend} from "../interfaces";
import * as React from "react";
import {StatelessComponent} from "react";

function backendKey(backend: Backend): string {
  if(isJamendoBackend(backend)) {
    return `jamendo-${backend.user_name}`;
  } else if(isFileBackend(backend)) {
    return backend.machine_id;
  }
  throw new Error("failed to get backend key: " + JSON.stringify(backend));
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
