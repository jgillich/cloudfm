import { StatelessComponent } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import { h } from "react-hyperscript-helpers";
import routes from "../routes"

const Root: StatelessComponent<any> = ({ store, history }) => (
  h(Provider, { store: store }, [
    h(Router, { history: history, routes: routes })
  ])
)

export default Root
