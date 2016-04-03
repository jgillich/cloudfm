import * as React from "react"
import { StatelessComponent } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import routes from "../routes"

const Root: StatelessComponent<any> = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>
)

export default Root
