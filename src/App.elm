import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import StartApp.Simple as StartApp
import Signal exposing (Signal, Address)
import Player
import DynamicCollection
import Stylesheet


type Action
  = NoOp
  | PlayerAction Player.Action
  | CollectionAction DynamicCollection.Action


type alias Model =
  { player : Player.Model
  , collection : DynamicCollection.Model
  }


initialModel : Model
initialModel =
  { player = Player.initialModel
  , collection = DynamicCollection.initialModel
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
        DynamicCollection.Play song ->
          { model | player = Player.update (Player.Play song) model.player }
        DynamicCollection.NoOp ->
          model
        _ ->
          { model | collection = DynamicCollection.update act model.collection }


view : Address Action -> Model -> Html
view address model =
  div
    []
    [ node "style" [] [ text Stylesheet.text ]
    , DynamicCollection.view (Signal.forwardTo address CollectionAction) model.collection
    , Player.view (Signal.forwardTo address PlayerAction) model.player
    ]



stylesheet : String -> Html
stylesheet url =
  node "link"
    [ rel "stylesheet"
    , href url
    ] []


main =
  StartApp.start
    { model = initialModel
    , update = update
    , view = view
    }
