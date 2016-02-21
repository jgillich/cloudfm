module Stylesheet (..) where

import Css exposing (..)
import Css.Elements exposing (..)
import Html.CssHelpers as CssHelpers
import Css.Namespace as Namespace


type CssClasses
  = NavLink
  | ArtistItem
  | AlbumItem


type CssIds
  = Logo
  | Collection
  | Main
  | CollectionArtists
  | CollectionAlbums


colors =
  { text = hex "333"
  , bg = hex "202020"
  , border = hex "F9F2E7"
  }


namespace =
  CssHelpers.namespace "" -- FIXME elm-css doesn't prepend namespace to elements


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
      , height (pc 100)
      , color colors.text
      , fontFamilies [ "Open Sans", "sans-serif" ]
      ]
    , (#) Main
      [ property "display"  "flex"
      , flexDirection column

      ]
    , header
      [ backgroundColor colors.bg
      , property "display"  "flex"
      , property "justify-content" "center"

      ]
    , (#) Logo
      [ flex2 (int 1) (em 2)
      , fontSize (em 2)
      , color (hex "FFF")
      , maxWidth (px 970)
      , lineHeight (px 50)
      , property "align-items" "center"
      ]
    , (#) Collection
      [ property "display"  "flex"
      , property "justify-content" "center"

      , flexDirection row
      ]
    , ul
      [ property  "list-style" "none"
      ]
    , li
      [ padding (em 0.5)
      , borderBottom3 (em 0.1) solid colors.border
      ]
    , (#) CollectionArtists
      [ flex (int 1)
      , height (pc 100)
      , maxWidth (px 300)

      ]
    , (#) CollectionAlbums
      [ flex (int 3)
        , maxWidth (px 670)
      ]
    ]


str =
  (compile css).css
