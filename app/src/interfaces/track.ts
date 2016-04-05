export interface Track {
  _id: string;
  album: string;
  artist: string;
  number: number;
  title: string;
  uri: TrackUri;
};

export interface TrackUri {
  id: string;
  backend: string;
  owner: string;
}
