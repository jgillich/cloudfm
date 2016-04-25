import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";

const Container: StatelessComponent<{}> =
  () => (
    <div className="flex flex-wrap">
      Discover...
    </div>
  );

export const Discover = connect()(Container);

