module Song (..) where

import Backend.Types

type alias Model =
  { title : String
  , url : String
  , backend : Backend.Types.Type
  }

initialModel : Model
initialModel =
  { title = ""
  , url = ""
  , backend = Backend.Types.None
  }
