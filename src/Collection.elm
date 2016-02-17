module Collection where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Signal, Address)
import Song
import Player


type Action
    = NoOp
    | Play Song.Model


type alias Model =
  { songs : List Song.Model
  }


initialModel : Model
initialModel =
  { songs =
      [ { artist = "India"
        , title = "National Anthem"
        , url = "http://www.sample-videos.com/audio/mp3/india-national-anthem.mp3"
        }
      , { artist = "Crowd"
        , title = "Cheering"
        , url = "http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3"
        }
      , { artist = "Wave"
        , title = "Waving"
        , url = "http://www.sample-videos.com/audio/mp3/wave.mp3"
        }
      ]
  }


collectionItem : Address Action -> Song.Model -> Html
collectionItem address song =
  div
    [ ]
    [ text (song.artist ++ ": " ++ song.title)
    , button [ onClick address (Play song) ] [ text "Play" ]
    ]


view : Address Action -> Model -> Html
view address model =
  div [] (List.map (collectionItem address) model.songs)
