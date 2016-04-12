import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {insertBackend} from "../actions";

const Container: StatelessComponent<any> = ({ dispatch }) => {
  let ownerInput, pathInput;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch(insertBackend({
          owner: ownerInput.value,
          path: pathInput.value,
        }));
        ownerInput.value = "";
        pathInput.value = "";
      }}>
        <input ref={node => { ownerInput = node }} placeholder="Owner" />
        <input ref={node => { pathInput = node }} placeholder="Path" />
        <button type="submit">
          Add Backend
        </button>
      </form>
    </div>
  );
};

export const AddBackend = connect()(Container as any);
