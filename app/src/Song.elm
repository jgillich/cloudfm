module Song (..) where

import Json.Decode as Decode exposing ((:=))
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


decode : Decode.Decoder Model
decode =
  Decode.object3 Model
    ("title" := Decode.string)
    ("url" := Decode.string)
    ("backend" := (Decode.succeed Backend.Http))
