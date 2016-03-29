import { Route } from "react-router"
import App from "../components/App"
import { h } from "react-hyperscript-helpers";

export default (
  h(Route, { path: "/", component: App })
)
