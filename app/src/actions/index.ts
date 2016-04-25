export * from "./track";
export * from "./player";
export * from "./user";
export * from "./artist";

// Workaround until we get proper string enums
// https://github.com/Microsoft/TypeScript/issues/3192
export type Action = "INSERT_ARTIST" | "UPDATE_ARTIST" | "REMOVE_ARTIST" |
  "INSERT_TRACK" | "UPDATE_TRACK" | "REMOVE_TRACK" |
  "PLAY_ALBUM" | "PLAY_ARTIST" | "PLAY_TRACK" |
  "LOGIN_USER" | "SIGNUP_USER" | "UPDATE_USER" |
  "RESET_ERROR";

/* tslint:disable:object-literal-sort-keys */
export const Action = {
  InsertArtist: "INSERT_ARTIST" as Action,
  RemoveArtist: "UPDATE_ARTIST" as Action,
  UpdateArtist: "REMOVE_ARTIST" as Action,

  InsertTrack: "INSERT_TRACK" as Action,
  RemoveTrack: "UPDATE_TRACK" as Action,
  UpdateTrack: "REMOVE_TRACK" as Action,

  PlayAlbum: "PLAY_ALBUM" as Action,
  PlayArtist: "PLAY_ARTIST" as Action,
  PlayTrack: "PLAY_TRACK" as Action,

  LoginUser: "LOGIN_USER" as Action,
  SignupUser: "SIGNUP_USER" as Action,
  UpdateUser: "UPDATE_USER" as Action,

  ResetError: "RESET_ERROR" as Action,
};
