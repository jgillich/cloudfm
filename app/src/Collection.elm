module Collection (..) where

import List exposing (..)
import Html exposing (..)
import Html.Attributes exposing (src)
import Html.Events exposing (..)
import Signal exposing (Signal, Address)
import Artist
import Album
import Stylesheet exposing (id, class, CssClasses(..), CssIds(..))
import Song
import Playlist
import Player
import Backend exposing(Types(..))


type Action
    = Play Playlist.Model


type alias Model =
    { artists : List Artist.Model
    }


initialModel : Model
initialModel =
  { artists =
      [ { name = "India"
        , albums =
            [ { name = "National Anthem"
              , songs =
                  [ { title = "National Anthem"
                    , url = "http://www.sample-videos.com/audio/mp3/india-national-anthem.mp3"
                    , backend = Http
                    }
                  ]
              }
            ]
        }
      , { name = "Crowd"
        , albums =
            [ { name = "Cheering"
              , songs =
                  [ { title = "Cheering"
                    , url = "http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3"
                    , backend = Http
                    }
                  ]
              }
            ]
        }
      , { name = "Wave"
        , albums =
            [ { name = "Waving"
              , songs =
                  [ { title = "Waving"
                    , url = "http://www.sample-videos.com/audio/mp3/wave.mp3"
                    , backend = Http
                    }
                  ]
              }
            ]
        }
      , { name = "evancz"
        , albums =
            [ { name = "Elm"
              , songs =
                  [ { title = "Elm"
                    , url = "https://www.youtube.com/embed/ZTliDiWDV0k"
                    , backend = YouTube
                    }
                  ]
              }
            ]
        }
      ]
  }


artistView : Address Action -> Artist.Model -> Html
artistView address artist =
  let playlist =
    map (\album -> album.songs) artist.albums
      |> foldr (++) []
  in
  li [ onClick address (Play playlist) ] [ text artist.name ]


albumView : Address Action -> Album.Model -> Html
albumView address album =
  li [ onClick address (Play album.songs) ] [ text album.name ]



view : Address Action -> Model -> Html
view address model =
  let
    albums =
      map (\artist -> artist.albums) model.artists
        |> foldr (++) []
  in
    div
      []
      [ ul [] (map (artistView address) model.artists)
      , ul [] (map (albumView address) albums)
      ]
