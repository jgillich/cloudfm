module Album (..) where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Signal, Address)
import Stylesheet exposing (..)
import Song
import Player
import Backend exposing(Types(..))


type alias Model =
    { name : String
    , songs : List Song.Model
    }


initialModel : Model
initialModel =
  { name = ""
  , songs = []
  }
