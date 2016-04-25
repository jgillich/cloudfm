import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {updateUser} from "../actions";
import {User} from "../interfaces";
const jamendoIcon = require("../assets/backends/jamendo.png");

interface AddBackendProps {
  user: User;
  dispatch: Dispatch;
}

const Container: StatelessComponent<AddBackendProps> = ({user, dispatch}) => {
  let fields: any = {};

  return (
    <div className="flex flex-column justify-center">
      <div className="flex flex-wrap justify-center pt2">
        <div className="col-8"><div className="h3">Add Backend</div></div>
      </div>
      <div className="flex flex-wrap justify-center flex-auto pt2">
        <div className="col-2 pr1" >
          <a className="btn btn-outline fit">
            <img className="fit" src={jamendoIcon}/>
          </a>
        </div>
        <div className="col-2 pr1">
          <a className="btn btn-outline fit">
            <img className="fit" src={jamendoIcon}/>
          </a>
        </div>
        <div className="col-2 pr1">
          <a className="btn btn-outline fit">
            <img className="fit" src={jamendoIcon}/>
          </a>
        </div>
        <div className="col-2 pr1">
          <a className="btn btn-outline fit">
            <img className="fit" src={jamendoIcon}/>
          </a>
        </div>
      </div>
      <form className="flex flex-wrap justify-center pt2" onSubmit={e => {
        e.preventDefault();
        let backend: any = {type: "jamendo"};
        Object.keys(fields).forEach((key) => {
          backend[key] = fields[key].value;
          fields[key].value = "";
        });
        user.backends.push(backend);
        dispatch(updateUser(user));
      }}>
        <div className="col-8">
          {(() => {
          switch ("jamendo") {
              case "jamendo":
                return (
                <div>
                  <input className="input"
                    ref={node => { fields.jamendo_id = node; }}
                    placeholder="User ID" />
                </div>
                );
              default: return <div></div>;
            }
          })()}

          <button className="btn btn-outline" type="submit">
            Add
          </button>
        </div>
      </form>

    </div>
  );
};

export const AddBackend = connect()(Container);
