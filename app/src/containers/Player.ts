import { connect } from "react-redux";
import Audio from "../components/Audio";

const mapStateToProps = (state) => {
  return {
    track: state.player,
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
