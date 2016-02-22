require! {
  faker
  '../fixtures/collection': fixture
}

get = (id, params, fn) ->
  fn null fixture![0]

find = (params, fn ) ->
  fn null fixture!

export get, find
