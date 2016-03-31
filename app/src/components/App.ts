import { Component, PropTypes, ValidationMap } from "react"
import { connect } from "react-redux"
import { browserHistory } from "react-router"
import { div, h1, h } from "react-hyperscript-helpers"
import VisibleTrackList from "../containers/VisibleTrackList"

export default class App extends Component<any, any> {

  render() {
    return div([
      h1("Hello World!"),
      h(VisibleTrackList)
    ])
  }

  static propTypes: ValidationMap<any> = {
    children: PropTypes.node
  }
}
