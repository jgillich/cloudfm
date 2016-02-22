module Artist (..) where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Signal, Address)
import Stylesheet exposing (..)
import Json.Decode as Decode exposing ((:=))
import Album
import Song


type alias Model =
    { name : String
    , albums : List Album.Model
    }


initialModel : Model
initialModel =
  { name = ""
  , albums = []
  }


decode : Decode.Decoder Model
decode =
  Decode.object2 Model
    ("name" := Decode.string)
    ("albums" := (Decode.list <| Album.decode))
