module Stylesheet (..) where

import Css exposing (..)
import Css.Elements exposing (..)
import Html.CssHelpers as CssHelpers
import Css.Namespace as Namespace


type CssClasses
  = NavLink
  | CollectionItem
  | CollectionItemField


type CssIds
  = Logo
  | Collection
  | Main


colors =
  { text = hex "333"
  , bg = hex "202020"
  , border = hex "F9F2E7"
  }


namespace =
  CssHelpers.namespace "qq" -- FIXME elm-css doesn't prepend namespace to elements


{ id, class, classList } =
  namespace


css =
  (stylesheet << Namespace.namespace namespace.name)
    [ html
      [ margin (em 0)
      , padding (em 0)
      ]
    , body
      [ margin (em 0)
      , padding (em 0)
      , color colors.text
      , fontFamilies [ "Open Sans", "sans-serif" ]
      ]
    , (#) Main
      [

      ]
    , header
      [ backgroundColor colors.bg
      , display dflex -- FIXME implement as flex
      --, justifyContent center FIXME not implemented
      ]
    , (#) Logo
      [ flex (int 1)
      , fontSize (em 2)
      , color (hex "FFF")
      , maxWidth (px 970)
      , lineHeight (px 50)
      ]
    , (#) Collection
      [ flex (int 1)
      ]
    , (.) CollectionItem
       --listStyle none FIXME not implemented
        []
    --, button
            ~ ( "border-left", "thin" )

    , (.) CollectionItemField
      [  padding (em 0.5)
      , borderBottom3 (em 0.1) solid colors.border
      ]
    ]


str =
  (compile css).css
