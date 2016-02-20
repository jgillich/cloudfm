module Backend.Http (..) where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Song

type alias Model =
  { url : String
  }


play : Song.Model -> Html
play song =
  audio
    [ src song.url
    , autoplay True
    , controls True
    ]
    []
