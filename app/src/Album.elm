module Album (..) where

import Song


type Action
    = Add (List Song.Model)


type alias Model =
    { name : String
    , songs : List Song.Model
    }


initialModel : Model
initialModel =
  { name = ""
  , songs = []
  }


update : Action -> Model -> Model
update action model =
  case action of
    Add songs ->
      let
        newSongs = merge model.songs songs
      in
        { model | songs = newSongs }


merge : List Song.Model -> List Song.Model -> List Song.Model
merge list1 list2 =
  case (list1, list2) of
    (x :: list1', list2) ->
      if not (songExists list2 x.title) then
        merge list1' (x :: list2)
      else
        merge list1' list2

    ([], list2) ->
      list2


songExists : List Song.Model -> String -> Bool
songExists songs songName =
  List.map (\song -> song.title == songName) songs
    |> List.member True
