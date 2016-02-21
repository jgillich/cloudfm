module Header (..) where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (src, href)
import Signal exposing (Signal, Address)
import Stylesheet exposing (id, class, CssClasses(..), CssIds(..))
import Song


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
    [ div [ id Nav ]
      [ a  [ class [ NavItem ], href "#" ] [ img [ id Logo, src "/assets/logo_white.svg" ] [] ]
      , a [ class [ NavItem ], href "#collection" ] [ text "Collection" ]
      , a [ class [ NavItem ], href "#discover" ] [ text "Discover" ]
      , a [ class [ NavItem ], href "#404" ] [ text "404" ]
      ]
    ]
