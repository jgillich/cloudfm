module Song (..) where

import Backend

type alias Model =
  { title : String
  , url : String
  , backend : Backend.Types
  }

initialModel : Model
initialModel =
  { title = ""
  , url = ""
  , backend = Backend.None
  }
