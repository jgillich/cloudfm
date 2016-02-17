module Player where

import Json.Decode as Json
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Signal, Address)
import Song


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
  div []
    [ Html.audio
      [ src model.song.url
      , autoplay True
      ]
      []
    ]
