module Player (..) where

import List exposing (..)
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Signal, Address)
import Song
import Playlist
import Backend exposing (Types(..))
import Backend.Http
import Backend.YouTube


type Action
  = Play Playlist.Model
  | Pause
  | Seek


type alias Model =
  { currentSong : Maybe Song.Model
  , playlist : Playlist.Model
  }


initialModel : Model
initialModel =
  { currentSong = Nothing
  , playlist = []
  }


update : Action -> Model -> Model
update action model =
  case action of
    Play playlist ->
      { model | currentSong = head playlist, playlist = playlist  }
    Pause ->
      model
    Seek ->
      model


view : Address Action -> Model -> Html
view address model =
  case model.currentSong of
    Just song ->
      case song.backend of
        Http ->
          Backend.Http.play song
        YouTube ->
          Backend.YouTube.play song
        None ->
          div [] []
    Nothing ->
      div [] []
