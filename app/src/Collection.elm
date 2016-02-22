module Collection (..) where

import List exposing (..)
import Html exposing (..)
import Html.Attributes exposing (src, href)
import Html.Events exposing (..)
import Signal exposing (Signal, Address)
import Json.Decode as Decode exposing ((:=))
import Dict
import Artist
import Album
import Stylesheet exposing (id, class, CssClasses(..), CssIds(..))
import Song
import Playlist
import Player
import Router
import Backend exposing(Types(..))


type Action
    = Play Playlist.Model


type alias Model = List Artist.Model


artistView : Address Action -> Artist.Model -> Html
artistView address artist =
  let
    playlist = map (\album -> album.songs) artist.albums
      |> foldr (++) []
  in
  li
    [ class [ ArtistItem ] ]
    [ a [ href ("#collection/" ++ artist.name) ] [ text artist.name ] ]


albumView : Address Action -> Album.Model -> Html
albumView address album =
  li
    [ class [ AlbumItem ], onClick address (Play album.songs) ]
    [ a [ href "#" ] [ img [ class [ AlbumCover ], src album.cover] [ ] ] ]



view : Address Action -> Model -> Router.Payload -> Html
view address model payload =
  let
    -- FIXME there probably is a better way to do this
    selectedArtist = Dict.get "artist" payload.params
    predicate = (\artist -> (Maybe.withDefault artist.name selectedArtist) == artist.name)
    albums = filter predicate  model
        |> map (\artist -> artist.albums)
        |> foldr (++) []
  in
    div
      [ id Collection ]
      [ ul [ id CollectionArtists ] (map (artistView address) model)
      , ul [ id CollectionAlbums ] (map (albumView address) albums)
      ]

decode : Decode.Decoder Model
decode =
  Decode.list <| Artist.decode
