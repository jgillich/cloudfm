module Stylesheet (..) where

import Css exposing (..)
import Css.Elements exposing (..)
import Html.CssHelpers as CssHelpers
import Css.Namespace as Namespace


type CssClasses
  = Active
  | ArtistItem
  | AlbumItem
  | NavItem


type CssIds
  = Logo
  | Nav
  | Collection
  | Main
  | CollectionArtists
  | CollectionAlbums


colors =
  { text = hex "333"
  , bg = hex "202020"
  , border = hex "F9F2E7"
  , active = hex "40C0CB"
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
      [ height (px 50)
      , property "object-fit" "cover"
      , marginLeft (em -2)
      , marginRight (em -1)
      ]
    , (#) Nav
      [ flex (int 1)
      , property "display"  "flex"
      , property "align-items" "center"
      , color (hex "FFF")
      , maxWidth (px 970)
      ]
    , a
      [ (withClass NavItem)
        [ marginLeft (em 1)
        , color (hex "FFF")
        , flex (int 0)
        ]
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
      ]
    , (#) CollectionArtists
      [ flex (int 1)
      , maxWidth (px 300)
      ]
    , (.) ArtistItem
      [ (withClass Active)
        [
          color colors.active
        ]
      ]
    , (#) CollectionAlbums
      [ flex (int 3)
      , maxWidth (px 670)
      ]
    ]


str =
  (compile css).css
