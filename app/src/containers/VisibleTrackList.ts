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
)(TrackList)

export default VisibleTrackList
