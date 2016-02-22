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


merge : List Song.Model -> List Song.Model -> List Song.Model
merge list1 list2 =
  case (list1, list2) of
    (x :: list1', list2) ->
      if not (songExists list2 x.title) then
        merge list1' (x :: list2)
      else
        merge list1' list2

    ([], list2) ->
      list2


songExists : List Song.Model -> String -> Bool
songExists songs songName =
  List.map (\song -> song.title == songName) songs
    |> List.member True


decode : Decode.Decoder Model
decode =
  Decode.object3 Model
    ("name" := Decode.string)
    ("cover" := Decode.string)
    ("songs" := (Decode.list <| Song.decode))
