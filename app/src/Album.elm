module Album (..) where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Signal, Address)
import Stylesheet exposing (..)
import Json.Decode as Decode exposing ((:=))
import Song
import Player


type alias Model =
    { name : String
    , cover: String
    , songs : List Song.Model
    }


initialModel : Model
initialModel =
  { name = ""
  , cover = ""
  , songs = []
  }


decode : Decode.Decoder Model
decode =
  Decode.object3 Model
    ("name" := Decode.string)
    ("cover" := Decode.string)
    ("songs" := (Decode.list <| Song.decode))
