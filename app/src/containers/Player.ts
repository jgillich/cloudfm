import {connect} from "react-redux";
import {Audio} from "../components";

export const Player = connect(
  state => ({
    src: state.player.uris ?
      `${process.env.SERVER_URL}/tracks/${state.player.uris[0]}`
      : "",
  })
)(Audio);
