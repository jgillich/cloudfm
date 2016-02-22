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
  | SongItem


type CssIds
  = Logo
  | Nav
  | Collection
  | Main
  | Page
  | CollectionArtists
  | CollectionAlbums
  | Player


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
      ]
    , a
      [ (withClass NavItem)
        [ marginLeft (em 1)
        , color (hex "FFF")
        ]
      ]
    , (#) Page
      [ property "display"  "flex"
      , property "align-items" "center"
      , flexDirection column
      ]
    , (#) Collection
      [ maxWidth (px 970)
      , flex (int 1)
      , property "display"  "flex"
      --, flexDirection row
      ]
    , (#) Player
      [ maxWidth (px 970)
      , flex (int 1)
      , property "display"  "flex"
      , property "align-items" "center"
      ]
    , ul -- FIXME move below Collection
      [ property  "list-style" "none"
      ]
    , li -- FIXME move below Collection
      [ padding (em 0.5)
      ]
    , (#) CollectionArtists
      [
      ]
    , (.) ArtistItem
      [ (withClass Active)
        [
          color colors.active
        ]
      ]
    , (#) CollectionAlbums
      [ width (pc 100)
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
