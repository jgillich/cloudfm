struct Song {
    title: String
}

struct Artist {
    name: String,
    albums: Vec<Album>
}

struct Album {
    name: String,
    songs: Vec<Song>
}
