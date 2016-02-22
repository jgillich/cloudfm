module App (..) where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (src, rel, href)
import StartApp
import Task exposing (Task)
import Signal exposing (Signal, Address)
import Effects exposing (Effects, Never)
import Stylesheet exposing (id, class, CssClasses(..), CssIds(..))
import Json.Decode exposing (list)
import Dict
import Http
import Player
import Collection
import Header
import Router
import Artist

type Action
  = HeaderAction Header.Action
  | PlayerAction Player.Action
  | CollectionAction Collection.Action
  | RouterAction Router.Action


type alias Model =
  { header : Header.Model
  , player : Player.Model
  , collection : Collection.Model
  , router: Router.Model
  }


update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    RouterAction subAction ->
      let
        (router, effects) = Router.update subAction model.router
      in
        ({ model | router = router }, Effects.map RouterAction effects)

    PlayerAction subAction ->
      ({ model | player = Player.update subAction model.player }, Effects.none)

    CollectionAction subAction ->
      case subAction of
        Collection.Play playlist ->
          ({ model | player = Player.update (Player.Play playlist) model.player }, Effects.none)

        _ ->
          let
            (collection, effects) = Collection.update subAction model.collection
          in
            ({ model | collection = collection }, Effects.map CollectionAction effects)

    _ ->
      (model, Effects.none)


view : Address Action -> Model -> Html
view address model =
  div
    [ id Main ]
    [ node "style" [] [ text Stylesheet.str ]
    , Header.view (Signal.forwardTo address HeaderAction) model.header
    , div [ id Page ] [ (pageView address model) ]
    ]

pageView : Signal.Address Action -> Model -> Html
pageView address model =
  let
    content = case model.router.page of
      Router.Collection page ->
        let
          maybeArtist =
            Dict.get "artist" model.router.payload.params
              |> Maybe.withDefault ""
              |> Collection.artistExists model.collection.artists
          maybeAlbum =
            case maybeArtist of
              Just artist ->
                Dict.get "album" model.router.payload.params
                  |> Maybe.withDefault ""
                  |> Artist.albumExists artist.albums
              Nothing ->
                Nothing
          www = (Debug.log "artist" (Collection.Artist  maybeArtist))
        in
        case page of
          Collection.All ->
            Collection.view (Signal.forwardTo address CollectionAction) Collection.All model.collection
          Collection.Artist maybeArtist ->
            Collection.view (Signal.forwardTo address CollectionAction) (Debug.log "artist" (Collection.Artist  maybeArtist))  model.collection
          Collection.Album maybeAlbum ->
            Collection.view (Signal.forwardTo address CollectionAction) (Collection.Album maybeAlbum)  model.collection

      Router.Discover ->
        div [] [ text "Discover" ]
      Router.NotFound ->
        div [] [ text "Not Found" ]
  in
    div []
    [ content
    , Player.view (Signal.forwardTo address PlayerAction) model.player
    ]


init : (Model, Effects Action)
init =
  let
    (collection, collectionEffects) = Collection.init
  in
  ( { header = Header.initialModel
    , player = Player.initialModel
    , collection = collection
    , router = Router.initialModel
    }
  , Effects.map CollectionAction collectionEffects
  )


app : StartApp.App Model
app =
  StartApp.start
    { init = init
    , update = update
    , view = view
    , inputs = [ (Signal.map RouterAction Router.signal) ]
    }


main: Signal Html
main =
  app.html


port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks


port routeRunTask : Task () ()
port routeRunTask =
  Router.run
