import { connect } from "react-redux";
import Audio from "../components/Audio";

const mapStateToProps = (state) => {
  if (state.player === null) {
    return { src: "" };
  };
  let { backend, owner, id } = state.player.uri;
  return {
    src: `${process.env.SERVER_URL}/v1/tracks/${backend}:${owner}:${id}`,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const Player = connect(
  mapStateToProps,
  mapDispatchToProps
)(Audio as any);

export default Player;
