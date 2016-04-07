export default [
  {
    singular: "track",
    plural: "tracks",
    relations: {
      album: {belongsTo: "album"},
      artist: {belongsTo: "artist"},
    },
  },
  {
    singular: "album",
    plural: "albums",
    relations: {
      tracks: {hasMany: "tracks"},
      artist: {belongsTo: "artist"},
    },
  },
  {
    singular: "artist",
    plural: "artists",
    relations: {
      tracks: {hasMany: "tracks"},
      albums: {hasMany: "albums"},
    },
  },
];
