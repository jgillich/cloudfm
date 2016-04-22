import * as React from "react";
import {StatelessComponent} from "react";

interface PropTypes {
  src: string;
};

export const Audio: StatelessComponent<PropTypes> = ({src}) => (
  <div className="">
    <div className="">
      <audio src={src} autoPlay={true} controls={true} />
    </div>
  </div>
);
