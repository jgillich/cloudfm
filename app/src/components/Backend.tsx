import * as React from "react";
import {Component, ReactElement} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {updateUser} from "../actions";
import {User, Backend, isJamendoBackend, isFileBackend} from "../interfaces";
import { Field, Form } from "react-redux-form";
const jamendoIcon = require("../assets/backends/jamendo.png");

interface BackendSettingsProps {
  user: User;
  dispatch: Dispatch;
  addBackend: Backend;
}

class BackendSettings extends Component<BackendSettingsProps, {}> {

  public props: BackendSettingsProps;

  private handleSubmit(backend: Backend): void {
    let { dispatch, user } = this.props;
    user.backends.push(backend);
    dispatch(updateUser(user));
  }

  public render(): ReactElement<string> {
      let { user, addBackend } = this.props;

      return (
      <div>
        <div className="h2">All Backends</div>
        <table className="table-light">
          <thead>
            <tr>
              <th>Type</th> <th>Name</th>
            </tr>
          </thead>
          <tbody>
            { user.backends.length ? user.backends.map(b => {
              if(isJamendoBackend(b)) {
                return (
                  <tr key={`jamendo-${b.user_name}`}>
                    <td>Jamendo</td>
                    <td>{b.user_name}</td>
                  </tr>
                );
              } else if(isFileBackend(b)) {
                return (
                  <tr key={`file-${b.machine_id}`}>
                    <td>File</td>
                    <td>{b.machine_id}</td>
                  </tr>
                );
              }
            }) : <tr><td>No backends found</td></tr>}
          </tbody>
        </table>

        <div className="h3">Add Backend</div>
        <Field model="addBackend.type">
          <div className="py1">
            <label className="pr1">
              <a className="btn btn-outline fit">
                <input style={{display:"none"}}
                  type="radio" name="type" value="jamendo" />
                <img style={{width: "5em"}} src={jamendoIcon}/>
              </a>
            </label>
            <label className="pr1">
              <a className="btn btn-outline fit">
                <input style={{display:"none"}}
                  type="radio" name="type" value="file" />
                <img style={{width: "5em"}} src={jamendoIcon}/>
              </a>
            </label>
            <label className="pr1">
              <a className="btn btn-outline fit">
                <input style={{display:"none"}}
                  type="radio" name="type" value="jamendo" />
                <img style={{width: "5em"}} src={jamendoIcon}/>
              </a>
            </label>
            <label className="pr1">
              <a className="btn btn-outline fit">
                <input style={{display:"none"}}
                  type="radio" name="type" value="jamendo" />
                <img style={{width: "5em"}} src={jamendoIcon}/>
              </a>
            </label>
          </div>
        </Field>
        <Form model="addBackend"
          onSubmit={backend => this.handleSubmit(backend) }>
          <div>
            {(() => {
            switch (addBackend.type) {
                case "jamendo":
                  return (
                  <div>
                    <Field  model="addBackend.user_name">
                      <input className="input" type="text"
                        placeholder="Jamendo Username" />
                    </Field>
                  </div>
                  );
                case "file":
                  return (
                  <div>
                    <Field  model="addBackend.machine_id">
                      <input className="input" type="text"
                        placeholder="Machine ID" />
                    </Field>
                    <Field  model="addBackend.paths">
                      <input className="input" type="text"
                        placeholder="Path" />
                    </Field>
                  </div>
                  );
                default:
                  throw new Error("unknown backend type: " + addBackend.type);
              }
            })()}

            <button className="btn btn-outline" type="submit">
              Add
            </button>
          </div>
        </Form>

      </div>
    );
  }
};

export const BackendSettingsContainer = connect(
  (state) => ({addBackend: state.addBackend, user: state.user}),
  (dispatch) => ({dispatch})
)(BackendSettings);
