import * as React from "react";
import {StatelessComponent} from "react";
import {Link} from "react-router";

export const Header: StatelessComponent<any> = () => (

    <nav className="flex bg-black">
      <ul className="list-reset">
          <li className="inline-block mr1">
            <Link to="/" className="btn red">cloudfm</Link>
          </li>
          <li className="inline-block mr1">
            <Link to="/collection" className="btn white">Collection</Link>
          </li>
          <li className="inline-block mr1">
            <Link to="/discover" className="btn white">Discover</Link>
          </li>
          <li className="inline-block mr1">
            <Link to="/settings" className="btn white">Settings</Link>
          </li>
      </ul>
    </nav>
);
