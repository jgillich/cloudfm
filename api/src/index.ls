require! {
  'feathers'
  'feathers-rest'
  'feathers-socketio'
  'body-parser'
  'cors'
  'prelude-ls': {map}
  './collection'
}

app = feathers!

app.configure feathers-rest!
app.configure feathers-socketio!

app.use body-parser.json!
app.use cors!

app.use '/collection' collection

app.listen 8155
console.log 'api listening on http://localhost:8155'
