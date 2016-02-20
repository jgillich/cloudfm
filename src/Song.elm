module Song where

type alias Model =
  { artist : String
  , title : String
  , url : String
  }

type Action = ChangeArtist
            | ChangeTitle
            | ChangeUrl

update : Action -> Model -> Model
update action model =
  case action of
    ChangeArtist ->
      model

    ChangeTitle ->
      model

    ChangeUrl ->
      model

initialModel : Model
initialModel =
  { artist = ""
  , title = ""
  , url = ""
  }
