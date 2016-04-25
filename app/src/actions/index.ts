export * from "./track";
export * from "./player";
export * from "./user";
export * from "./artist";

export enum Action {
  InsertArtist,
  RemoveArtist,
  UpdateArtist,

  InsertTrack,
  RemoveTrack,
  UpdateTrack,

  PlayAlbum,
  PlayArtist,
  PlayTrack,

  LoginUser,
  SignupUser,
  UpdateUser,

  ResetError,
};
