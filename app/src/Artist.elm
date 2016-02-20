module Artist (..) where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Signal, Address)
import Stylesheet exposing (..)
import Album
import Song


{ id, class, classList } =
  namespace

-- MODEL

type alias Model =
    { name : String
    , albums : List Album.Model
    }


initialModel : Model
initialModel =
  { name = ""
  , albums = []
  }


-- UPDATE

--
--
-- update : Action -> Model -> Model
-- update action model =
--   case action of
--     Insert album ->
--       let newAlbum = ( model.nextID, album )
--           newAlbums = model.albums ++ [ newAlbum ]
--       in
--           { model |
--               albums = newAlbums,
--               nextID = model.nextID + 1
--           }
--
--     Remove ->
--       { model | albums = List.drop 1 model.albums }
--
--     Modify id albumAction ->
--       let updateAlbum (albumID, albumModel) =
--               if albumID == id then
--                   (albumID, Album.update albumAction albumModel)
--               else
--                   (albumID, albumModel)
--       in
--           { model | albums = List.map updateAlbum model.albums }

    -- _ ->
    --   model

-- VIEW

--
--
-- view : Address Action -> Model -> Html
-- view address model =
--   div [] (List.map (collectionItem address) model.songs)
