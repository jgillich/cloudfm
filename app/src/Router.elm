module Router (..) where

import Effects exposing (Effects, Never)
import Hop
import Collection

type alias Payload = Hop.Payload


type Action
  = HopAction Hop.Action
  | ShowCollection Collection.Page Hop.Payload
  | ShowDiscover Hop.Payload
  | ShowNotFound Hop.Payload
  | NavigateTo String


type Page
  = Collection Collection.Page
  | Discover
  | NotFound


type alias Model =
  { payload : Hop.Payload
  , page : Page
  }


initialModel =
  { payload = router.payload
  , page = Collection Collection.All
  }


routes : List (String, Hop.Payload -> Action)
routes =
  [ ("/", ShowCollection Collection.All)
  , ("/collection", ShowCollection Collection.All)
  , ("/collection/:artist", ShowCollection (Collection.Artist Nothing))
  , ("/collection/:artist/:album", ShowCollection (Collection.Album Nothing))
  , ("/discover", ShowDiscover)
  ]


router : Hop.Router Action
router =
  Hop.new {
    routes = routes,
    notFoundAction = ShowNotFound
  }

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    NavigateTo path ->
      (model, Effects.map HopAction (Hop.navigateTo path))
    ShowCollection page payload ->
      ({ model | page = Collection page, payload = payload }, Effects.none)
    ShowDiscover payload ->
      ({ model | page = Discover, payload = payload }, Effects.none)
    ShowNotFound payload ->
      ({ model | page = NotFound, payload = payload }, Effects.none)
    _ ->
      (model, Effects.none)


signal =
  router.signal


run =
  router.run
