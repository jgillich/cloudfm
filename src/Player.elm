module Player where

import Json.Decode as Json
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (src, type', controls)
import Signal exposing (Signal, Address)

onTimeUpdate : Address a -> a -> Attribute
onTimeUpdate address value =
    on "timeupdate" Json.value (\_ -> Signal.message address value)

type alias Model = Int

type Action
  = Play
  | Pause
  | Seek

update : Action -> Model -> Model
update action model =
  case action of
    Play ->
      model
    Pause ->
      model
    Seek ->
      model

view : Address Action -> Model -> Html
view address model =
  div []
    [ Html.audio
      [ src "https://raw.githubusercontent.com/jcollard/elm-audio/master/snd/theme.mp3"
      , type' "audio/mp3"
      , controls True
      --, onTimeUpdate address Seek
      ]
      []
    ]
