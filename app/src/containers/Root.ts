import { Component, PropTypes, ValidationMap } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router } from 'react-router'
import { h } from "react-hyperscript-helpers";

export default class Root extends Component<any, any> {
  render(): JSX.Element {
    const { store, history } = this.props
    return (
      h(Provider, { store: store }, [
        h(Router, { history: history, routes: routes })
      ])
    )
  }

  static propTypes: ValidationMap<any> = {
    tore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
}
