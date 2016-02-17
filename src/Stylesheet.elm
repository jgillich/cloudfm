module Stylesheet where

import Css exposing (..)
import Css.Elements exposing (..)
import Css.Namespace exposing (namespace)


type Classes
  = NavLink


type Identifiers
  = Logo


css =
  (stylesheet << namespace "mp")
    [ body
      [ margin (px 5)
      , padding (px 5)
      ]

    ]


text =
  (compile css).css
