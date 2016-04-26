import * as React from "react";
import {Component, ReactElement} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {updateUser} from "../actions";
import {User, Backend} from "../interfaces";
import { Field, Form } from "react-redux-form";
const jamendoIcon = require("../assets/backends/jamendo.png");

interface AddBackendProps {
  user: User;
  dispatch: Dispatch;
  addBackend: Backend;
}

class Container extends Component<AddBackendProps, {}> {

  public props: AddBackendProps;

  private handleSubmit(backend: Backend): void {
    let { dispatch, user } = this.props;
    user.backends.push(backend);
    dispatch(updateUser(user));
  }

  public render(): ReactElement<string> {
      let { addBackend } = this.props;

      return (
      <div className="flex flex-column justify-center">
        <div className="flex flex-wrap justify-center pt2">
          <div className="col-8"><div className="h3">Add Backend</div></div>
        </div>
        <Field model="addBackend.type">
          <div className="flex flex-wrap justify-center flex-auto pt2">
            <label className="col-2 pr1" >
              <a className="btn btn-outline fit">
                <input style={{display:"none"}}
                  type="radio" name="type" value="jamendo" />
                <img className="fit" src={jamendoIcon}/>
              </a>
            </label>
            <label className="col-2 pr1" >
              <a className="btn btn-outline fit">
                <input style={{display:"none"}}
                  type="radio" name="type" value="file" />
                <img className="fit" src={jamendoIcon}/>
              </a>
            </label>
            <label className="col-2 pr1" >
              <a className="btn btn-outline fit">
                <input style={{display:"none"}}
                  type="radio" name="type" value="jamendo" />
                <img className="fit" src={jamendoIcon}/>
              </a>
            </label>
            <label className="col-2 pr1" >
              <a className="btn btn-outline fit">
                <input style={{display:"none"}}
                  type="radio" name="type" value="jamendo" />
                <img className="fit" src={jamendoIcon}/>
              </a>
            </label>
          </div>
        </Field>
        <Form model="addBackend"
          className="flex flex-wrap justify-center pt2"
          onSubmit={backend => this.handleSubmit(backend) }>
          <div className="col-8">
            {(() => {
            switch (addBackend.type) {
                case "jamendo":
                  return (
                  <div>
                    <Field  model="addBackend.jamendo_id">
                      <input className="input" type="text"
                        placeholder="User ID" />
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

export const AddBackend = connect(
  (state) => ({addBackend: state.addBackend, user: state.user}),
  (dispatch) => ({dispatch})
)(Container);
