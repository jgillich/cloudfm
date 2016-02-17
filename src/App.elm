import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import StartApp.Simple as StartApp
import Signal exposing (Signal, Address)
import Player
import Collection


type Action
  = NoOp
  | PlayerAction Player.Action
  | CollectionAction Collection.Action


type alias Model =
  { player : Player.Model
  , collection : Collection.Model
  }


initialModel : Model
initialModel =
  { player = Player.initialModel
  , collection = Collection.initialModel
  }


update : Action -> Model -> Model
update action model =
  case action of
    NoOp ->
      model
    PlayerAction act ->
      { model | player = Player.update act model.player }

    CollectionAction act ->
      case act of
        Collection.Play song ->
          { model | player = Player.update (Player.Play song) model.player }
        Collection.NoOp ->
          model


view : Address Action -> Model -> Html
view address model =
  div
    []
    [ Collection.view (Signal.forwardTo address CollectionAction) model.collection
    , Player.view (Signal.forwardTo address PlayerAction) model.player
    ]


main =
  StartApp.start
    { model = initialModel
    , update = update
    , view = view
    }
