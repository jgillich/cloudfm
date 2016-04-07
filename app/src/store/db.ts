import * as PouchDB from "pouchdb";

(PouchDB as any).plugin(require("pouchdb-authentication"));
(PouchDB as any).plugin(require("relational-pouch"));

const db: any = new PouchDB("cloudfm");

db.setSchema([
  {
    singular: "track",
    plural: "tracks",
    relations: {
      album: {belongsTo: "album"},
      artist: {belongsTo: "artist"},
    }
  },
  {
    singular: "album",
    plural: "albums",
    relations: {
      tracks: {hasMany: "tracks"},
      artist: {belongsTo: "artist"},
    }
  },
  {
    singular: "artist",
    plural: "artists",
    relations: {
      tracks: {hasMany: "tracks"},
      albums: {hasMany: "albums"},
    }
  }
]);

// View functions are converted to string, but we still need to define
// emit or TypeScript won't compile this
function emit(a: any, b?: any) {}

const views = {
  tracks: makeViews("tracks"),
  albums: makeViews("albums"),
  artists: makeViews("artists"),
};

function makeViews(type: string, extraViews = {}) {
  const prefix = type + "_";
  return Object.assign({
    all: {
      map: function(doc) { if(doc.id.startsWith(prefix)) emit(doc._id) }.toString(),
    }
  }, extraViews);
}

Object.keys(views).forEach((key) => {
  db.put({
    _id: "_design/" + key,
    views: views[key],
  });
})

export default db;
