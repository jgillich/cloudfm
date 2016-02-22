module Artist (..) where

import Album


type Action
    = Add (List Album.Model)


type alias Model =
    { name : String
    , albums : List Album.Model
    }


initialModel : Model
initialModel =
  { name = ""
  , albums = []
  }


update : Action -> Model -> Model
update action model =
  case action of
    Add albums ->
      let
        newAlbums = merge model.albums albums
      in
        { model | albums = newAlbums }


merge : List Album.Model -> List Album.Model -> List Album.Model
merge list1 list2 =
  case (list1, list2) of
    (x :: list1', list2) ->
      case (albumExists list2 x.name) of
        Just album ->
          merge list1' ({ album | songs = (Album.merge album.songs x.songs) } :: List.filter (albumNameDoNotEqual album.name) list2)
        Nothing ->
          merge list1' (x :: list2)

    ([], list2) ->
      list2


albumExists : List Album.Model -> String -> Maybe Album.Model
albumExists albums albumName =
  List.map (getAlbumIfNameEquals albumName) albums
    |> Maybe.oneOf

getAlbumIfNameEquals : String -> Album.Model -> Maybe Album.Model
getAlbumIfNameEquals name album =
  if album.name == name then
    Just album
  else
    Nothing


albumNameDoNotEqual : String -> Album.Model -> Bool
albumNameDoNotEqual name album =
  album.name /= name
