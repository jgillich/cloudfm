module Collection (..) where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Signal, Address)
import Stylesheet exposing (..)
import Song
import Player
import Backend.Types


{ id, class, classList } =
  namespace

-- MODEL

type alias Model =
    { songs : List ( ID, Song.Model )
    , nextID : ID
    }


type alias ID = Int


initialModel : Model
initialModel =
  { songs =
      [ ( 0
        , { artist = "India"
          , title = "National Anthem"
          , url = "http://www.sample-videos.com/audio/mp3/india-national-anthem.mp3"
          , backend = Backend.Types.Http
          }
        )
      , ( 1
        , { artist = "Crowd"
          , title = "Cheering"
          , url = "http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3"
          , backend = Backend.Types.Http
          }
        )
      , ( 2
        , { artist = "Wave"
          , title = "Waving"
          , url = "http://www.sample-videos.com/audio/mp3/wave.mp3"
          , backend = Backend.Types.Http
          }
        )
      , ( 3
        , { artist = "evancz"
          , title = "Elm"
          , url = "https://www.youtube.com/embed/ZTliDiWDV0k"
          , backend = Backend.Types.YouTube
          }
        )
      ]
  , nextID = 3
  }


-- UPDATE

type Action
    = Insert Song.Model
    | Remove
    | Modify ID Song.Action
    | Play Song.Model


update : Action -> Model -> Model
update action model =
  case action of
    Insert song ->
      let newSong = ( model.nextID, song )
          newSongs = model.songs ++ [ newSong ]
      in
          { model |
              songs = newSongs,
              nextID = model.nextID + 1
          }

    Remove ->
      { model | songs = List.drop 1 model.songs }

    Modify id songAction ->
      let updateSong (songID, songModel) =
              if songID == id then
                  (songID, Song.update songAction songModel)
              else
                  (songID, songModel)
      in
          { model | songs = List.map updateSong model.songs }

    _ ->
      model

-- VIEW

collectionItem : Address Action -> (ID, Song.Model) -> Html
collectionItem address (identifier, song) =
  table
    [ id Collection ]
    [ tr []
      [ th [] [ text song.artist ]
      , th [] [ text song.title ]
      , th [] [ button [ onClick address (Play song) ] [ text "Play" ] ]
      ]
    ]


view : Address Action -> Model -> Html
view address model =
  div [] (List.map (collectionItem address) model.songs)
