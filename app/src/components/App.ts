import { Component, PropTypes, ValidationMap } from "react"
import { connect } from "react-redux"
import { browserHistory } from "react-router"
import { h1 } from "react-hyperscript-helpers"

export default class App extends Component<any, any> {


  render() {
    return (
      h1("App")
    )
  }

  static propTypes: ValidationMap<any> = {
    children: PropTypes.node
  }
}
