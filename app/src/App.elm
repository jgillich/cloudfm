import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (src, rel, href)
import StartApp.Simple as StartApp
import Signal exposing (Signal, Address)
import Stylesheet exposing (..)
import Stylesheet exposing (id, class, CssClasses(..), CssIds(..))
import Player
import Collection
import Stylesheet
import Header



type Action
  = HeaderAction Header.Action
  | PlayerAction Player.Action
  | CollectionAction Collection.Action


type alias Model =
  { header : Header.Model
  , player : Player.Model
  , collection : Collection.Model
  }


initialModel : Model
initialModel =
  { header = Header.initialModel
  , player = Player.initialModel
  , collection = Collection.initialModel
  }


update : Action -> Model -> Model
update action model =
  case action of
    PlayerAction act ->
      { model | player = Player.update act model.player }

    CollectionAction act ->
      case act of
        Collection.Play playlist ->
          { model | player = Player.update (Player.Play playlist) model.player }
    _ ->
      model


view : Address Action -> Model -> Html
view address model =
  div
    [ id Main ]
    [ node "style" [] [ text Stylesheet.str ]
    , Header.view (Signal.forwardTo address HeaderAction) model.header
    , Collection.view (Signal.forwardTo address CollectionAction) model.collection
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
