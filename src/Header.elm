module Header (..) where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Signal, Address)
import Stylesheet exposing (..)
import Song


{ id, class, classList } =
  namespace


type Action
  = NoOp


type alias Model =
  {
  }


initialModel : Model
initialModel =
  {
  }


update : Action -> Model -> Model
update action model =
  model


view : Address Action -> Model -> Html
view address model =
  header []
    [ span [ id Logo ] [ text "Name" ]
    ]
