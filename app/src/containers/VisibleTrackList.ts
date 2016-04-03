import { connect } from "react-redux"
import TrackList from "../components/TrackList"

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const VisibleTrackList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackList as any) // FIXME https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237#issuecomment-203987302

export default VisibleTrackList