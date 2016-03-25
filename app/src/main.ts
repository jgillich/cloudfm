/// <reference path='../typings/browser.d.ts'/>
/// <reference path='./main.d.ts'/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import { h1 } from "react-hyperscript-helpers";

ReactDOM.render(
  h1('Hello, World!'),
  document.body
);
