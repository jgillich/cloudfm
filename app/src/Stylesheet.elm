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
  | AlbumCover


type CssIds
  = Logo
  | Nav
  | Collection
  | Main
  | Page
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
    , (#) Nav
      [ flex (int 1)
      , property "display"  "flex"
      , property "align-items" "center"
      , color (hex "FFF")
      , maxWidth (px 970)
      ]
    , (#) Logo
      [ height (px 50)
      , property "object-fit" "cover"
      , marginLeft (em -2)
      , marginRight (em -1)
      ]
    , a
      [ (withClass NavItem)
        [ marginLeft (em 1)
        , color (hex "FFF")
        , flex (int 0)
        ]
      ]
    , (#) Page
      [ property "display"  "flex"
      , property "justify-content" "center"
      , flexDirection row
      ]
    , (#) Collection
      [ maxWidth (px 970)
      , flex (int 1)
      , property "display"  "flex"
      , property "align-items" "center"
      ]
    , ul
      [ property  "list-style" "none"
      ]
    , li
      [ padding (em 0.5)
      ]
    , (#) CollectionArtists
      [ flex (int 1)
      , property "align-items" "center"
      ]
    , (.) ArtistItem
      [ (withClass Active)
        [
          color colors.active
        ]
      ]
    , (#) CollectionAlbums
      [ flex (int 5)
      , property "align-items" "center"
      ]
    , (.) AlbumItem
      [ display inline
      ]
    , (.) AlbumCover
      [ width (px 150)
      , height (px 150)
      , property "object-fit" "cover"
      ]
    ]


str =
  (compile css).css
