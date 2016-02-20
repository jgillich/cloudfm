module Player (..) where

import Json.Decode as Json
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Signal, Address)
import Song
import Backend.Types
import Backend.Http
import Backend.YouTube

type Action
  = Play Song.Model
  | Pause
  | Seek


type alias Model =
  { song : Song.Model
  }


initialModel : Model
initialModel =
  { song = Song.initialModel
  }


update : Action -> Model -> Model
update action model =
  case action of
    Play song ->
      { model | song = song }
    Pause ->
      model
    Seek ->
      model


view : Address Action -> Model -> Html
view address model =
  case model.song.backend of
    Backend.Types.Http ->
      Backend.Http.play model.song
    Backend.Types.YouTube ->
      Backend.YouTube.play model.song
    Backend.Types.None ->
      div [] []
