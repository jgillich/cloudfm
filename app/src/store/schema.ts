export default [
  {
    plural: "tracks",

    relations: {
      album: {belongsTo: "album"},
      artist: {belongsTo: "artist"},
    },
    singular: "track",
  },
  {
    plural: "albums",
    relations: {
      artist: {belongsTo: "artist"},
      tracks: {hasMany: "tracks"},
    },
    singular: "album",
  },
  {
    plural: "artists",
    relations: {
      albums: {hasMany: "albums"},
      tracks: {hasMany: "tracks"},
    },
    singular: "artist",
  },
  {
    plural: "backends",
    singular: "backend",
  },
];
