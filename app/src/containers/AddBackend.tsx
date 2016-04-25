import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {updateUser} from "../actions";
import {User} from "../interfaces";

interface AddBackendProps {
  user: User;
  dispatch: Dispatch;
}

const Container: StatelessComponent<AddBackendProps> = ({ user, dispatch }) => {
  let machineIdInput, pathInput;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        user.backends.push({
          machine_id: machineIdInput.value,
          paths: [pathInput.value],
          type: "file",
        });
        dispatch(updateUser(user));
        machineIdInput.value = "";
        pathInput.value = "";
      }}>
        <input ref={node => { machineIdInput = node; }} placeholder="MachineId" />
        <input ref={node => { pathInput = node; }} placeholder="Path" />
        <button type="submit">
          Add Backend
        </button>
      </form>
    </div>
  );
};

export const AddBackend = connect()(Container);
