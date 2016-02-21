module App (..) where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (src, rel, href)
import StartApp
import Task exposing (Task)
import Signal exposing (Signal, Address)
import Effects exposing (Effects, Never)
import Stylesheet exposing (..)
import Stylesheet exposing (id, class, CssClasses(..), CssIds(..))
import Player
import Collection
import Stylesheet
import Header
import Router


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


initialModel : Model
initialModel =
  { header = Header.initialModel
  , player = Player.initialModel
  , collection = Collection.initialModel
  , router = Router.initialModel
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
      (model, Effects.none)


view : Address Action -> Model -> Html
view address model =
  div
    [ id Main ]
    [ node "style" [] [ text Stylesheet.str ]
    , Header.view (Signal.forwardTo address HeaderAction) model.header
    , pageView address model
    ]

pageView : Signal.Address Action -> Model -> Html
pageView address model =
  case model.router.page of
    Router.Collection ->
      div []
      [ Collection.view (Signal.forwardTo address CollectionAction) model.collection model.router.payload
      , Player.view (Signal.forwardTo address PlayerAction) model.player
      ]
    Router.Discover ->
      div [] [ text "Discover" ]
    Router.NotFound ->
      div [] [ text "Not Found" ]


stylesheet : String -> Html
stylesheet url =
  node "link"
    [ rel "stylesheet"
    , href url
    ] []


init : (Model, Effects Action)
init =
  (initialModel, Effects.none)


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
