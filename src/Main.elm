import Html exposing (..)
import Html.Attributes exposing (..)
import StartApp.Simple as StartApp
import Signal exposing (Signal, Address)
import Player


stylesheet =
  node "link"
    [ attribute "rel"       "stylesheet"
    , attribute "property"  "stylesheet"
    , attribute "href"      "//npmcdn.com/basscss@8.0.0/css/basscss.min.css"
    ]
    []


type Action
  = NoOp
  | PlayerAction Player.Action


type alias Model =
  { player : Player.Model
  }


initialModel : Model
initialModel =
  { player = 0 }


update : Action -> Model -> Model
update action model =
  model


view : Address Action -> Model -> Html
view address model =
  div
    []
    [ stylesheet
    , text "Hello"
    , Player.view (Signal.forwardTo address PlayerAction) 0
    ]


main =
  StartApp.start
    { model = initialModel
    , update = update
    , view = view
    }
