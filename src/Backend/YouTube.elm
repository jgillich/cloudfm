module Backend.YouTube (..) where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Song


type alias Model =
  { url : String
  }

play : Song.Model -> Html
play model =
  iframe
    [ src model.url
    ] []
