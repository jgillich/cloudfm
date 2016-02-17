module Song where

type alias Model =
  { artist : String
  , title : String
  , url : String
  }

initialModel : Model
initialModel =
  { artist = ""
  , title = ""
  , url = ""
  }
