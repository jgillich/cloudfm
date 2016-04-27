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
  <div>
    <div className="h2 col-12">All Backends</div>
    <table className="table-light col-12">
      <thead>
        <tr>
          <th>Type</th> <th>Name</th>
        </tr>
      </thead>
      <tbody>
        { user.backends.length ? user.backends.map(b => {
          if(isJamendoBackend(b)) {
            return (
              <tr>
                <td>Jamendo</td>
                <td>{b.user_name}</td>
              </tr>
            );
          } else if(isFileBackend(b)) {
            return (
              <tr>
                <td>File</td>
                <td>{b.machine_id}</td>
              </tr>
            );
          }
        }) : <li>No backends found</li>}
      </tbody>
    </table>

  </div>
);
