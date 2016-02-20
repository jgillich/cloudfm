module Stylesheet (..) where

import Css exposing (..)
import Css.Elements exposing (..)
import Html.CssHelpers as CssHelpers
import Css.Namespace as Namespace

type Classes
  = NavLink


type Identifiers
  = Logo
  | Collection


colors =
  { text = hex "333"
  , bg = hex "202020"
  }


namespace =
  CssHelpers.namespace "" -- FIXME elm-css doesn't prepend namespace to elements


css =
  (stylesheet << Namespace.namespace namespace.name)
    [ html
      [ margin (em 0)
      , padding (em 0)
      ]
    ,  body
      [ margin (em 0)
      , padding (em 0)
      , color colors.text
      ]
    , header
      [ backgroundColor colors.bg
      , paddingLeft (em 0.5)
      , display dflex
      ]
    , (#) Logo
      [ fontSize (em 2)
      , color (hex "FFF")
      ]
    , th
      [  padding (em 0.5)

      ]

    ]


str =
  (compile css).css
