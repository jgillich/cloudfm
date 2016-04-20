import {connect} from "react-redux";
import {Audio} from "../components";

const mapStateToProps = (state) => {
  if (!state.player.uris) {
    return {src: "" };
  };
  return {
    src: `${process.env.SERVER_URL}/tracks/${state.player.uris[0]}`,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export const Player = connect(
  mapStateToProps,
  mapDispatchToProps
)(Audio as any);
