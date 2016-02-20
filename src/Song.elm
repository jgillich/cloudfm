module Song (..) where

import Backend.Types

type alias Model =
  { artist : String
  , title : String
  , url : String
  , backend : Backend.Types.Type
  }

initialModel : Model
initialModel =
  { artist = ""
  , title = ""
  , url = ""
  , backend = Backend.Types.None
  }

type Action
  = Play
  | Pause

update : Action -> Model -> Model
update action model =
  case action of
    Play ->
      model

    Pause ->
      model
