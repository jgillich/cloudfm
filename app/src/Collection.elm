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
import Http
import Effects exposing (Effects)
import Task exposing (Task)
import Song
import Playlist
import Player


type Action
    = Play Playlist.Model
    | Add (List Artist.Model)
    | Update (Result Http.Error (List Artist.Model))


type Page
  = All
  | Artist (Maybe Artist.Model)
  | Album (Maybe Album.Model)


type alias Model =
  { artists : List Artist.Model
  , status : Status
  , page : Page
  }

type Status
  = Init
  | Fetching
  | Fetched
  | HttpError Http.Error

merge : List Artist.Model -> List Artist.Model -> List Artist.Model
merge list1 list2 =
  case (list1, list2) of
    (x :: list1', list2) ->
      case (artistExists list2 x.name) of
        Just artist ->
          merge list1' ({ artist | albums = (Artist.merge artist.albums x.albums) } :: List.filter (artistNameDoNotEqual artist.name) list2)
        Nothing ->
          merge list1' (x :: list2)

    ([], list2) ->
      list2


artistExists : List Artist.Model -> String -> Maybe Artist.Model
artistExists artists artistName =
  List.map (getArtistIfNameEquals artistName) artists
    |> Maybe.oneOf


getArtistIfNameEquals : String -> Artist.Model -> Maybe Artist.Model
getArtistIfNameEquals name artist =
  if artist.name == name then
    Just artist
  else
    Nothing


artistNameDoNotEqual : String -> Artist.Model -> Bool
artistNameDoNotEqual name artist =
  artist.name /= name


update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    Add artists ->
      ({ model | artists = merge model.artists artists }, Effects.none)
    Update result ->
      case result of
        Ok artists ->
          ( { model | artists = artists
            , status = Fetched
            }
          , Effects.none
          )
        Err error ->
          ( { model | status = HttpError error }
          , Effects.none
          )
    _ ->
      (model, Effects.none)



artistItem : Address Action -> Artist.Model -> Html
artistItem address artist =
  let
    playlist = map (\album -> album.songs) artist.albums
      |> foldr (++) []
  in
  li
    [ class [ ArtistItem ] ]
    [ a [ href ("#collection/" ++ artist.name) ] [ text artist.name ] ]


artistAlbums : Address Action -> Artist.Model -> List Html
artistAlbums address artist =
  map (albumItem address artist) artist.albums


albumItem : Address Action -> Artist.Model -> Album.Model -> Html
albumItem address artist album =
  let
    albumUrl = "#collection/" ++ artist.name ++ "/" ++ album.name
  in
  li
    [ class [ AlbumItem ], onClick address (Play album.songs) ]
    [ a [ href albumUrl ] [ img [ class [ AlbumCover ], src album.cover] [ ] ] ]


songItem : Address Action -> Song.Model -> Html
songItem address song =
  li
    [ class [ SongItem ], onClick address (Play [ song ]) ]
    [ text song.title ]


albumsView : Address Action -> Maybe String -> Model -> Html
albumsView address maybeArtist model =
  let
    -- FIXME there probably is a better way to do this
    predicate = (\artist -> (Maybe.withDefault artist.name maybeArtist) == artist.name)
    albums = filter predicate model.artists
        |> map (artistAlbums address)
        |> foldr (++) []
  in
    div
      [ id Collection ]
      [ ul [ id CollectionArtists ] (map (artistItem address) model.artists)
      , ul [ id CollectionAlbums ] albums
      ]


view : Address Action -> Page -> Model -> Html
view address page model =
  case page of
    All ->
      div
        [ id Collection ]
        [ ul [ id CollectionArtists ] (map (artistItem address) model.artists)
        , ul [ id CollectionAlbums ] (map (artistAlbums address) model.artists |> foldr (++) [])
        ]
    Artist maybeArtist ->
      let
        artists = case Debug.log "artist" maybeArtist of
          Just artist ->
            [ artist ]
          Nothing ->
            model.artists
      in
        div
          [ id Collection ]
          [ ul [ id CollectionArtists ] (map (artistItem address) model.artists)
          , ul [ id CollectionAlbums ] (map (artistAlbums address) artists |> foldr (++) [])
          ]
    Album maybeAlbum ->
      let
      qwe =  Debug.log "album" maybeAlbum
      in
      div [] []

init : (Model, Effects Action)
init =
  ( { artists = []
    , status = Init
    , page = All
    }
  , Http.get decode "http://localhost:8155/collection"
      |> Task.toResult
      |> Task.map Update
      |> Effects.task
  )


decode : Decode.Decoder (List Artist.Model)
decode =
  Decode.list <| Artist.decode
