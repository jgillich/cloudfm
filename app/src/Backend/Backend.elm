module Backend.Backend (..) where

import Html exposing (..)
import Song
import Backend.Http
import Backend.YouTube
import Backend.Types as Type

play : Song.Model -> Html
play song =
  case song.backend of
    Type.Http ->
      Backend.Http.play song
    Type.YouTube ->
      Backend.YouTube.play song
    Type.None ->
      div [] []
