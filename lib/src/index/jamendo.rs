
use chill;
use super::{Index, Indexer};
use {DecodedTrack, JamendoUri, Uri, User, Error, JamendoBackend};
use jamendo;

impl Indexer<JamendoBackend> for Index {
    fn index(db: &chill::Client, user: &User, backend: &JamendoBackend) -> Result<(), Error> {
        let client = jamendo::Client::new(jamendo::TEST_ID); // FIXME we shall not use TEST_ID
        let users = client.get_users_tracks().user_id(backend.user_id).run()?;
        let mut decoded: Vec<DecodedTrack> = Vec::new();

        for user in users {
            for track in user.tracks {
                // users/tracks does not include position, so we have to fetch the track again
                if let Some(track) = client.get_tracks().track_id(track.id).run()?.first() {
                    decoded.push(DecodedTrack {
                        artist: track.artist_name.clone(),
                        album: track.album_name.clone(),
                        name: track.name.clone(),
                        number: track.position,
                        uri: Uri::Jamendo(JamendoUri::new(track.id)),
                    });
                }
            }
        }

        Index::take_result(db, &user.db_name(), decoded)?;
        Ok(())
    }
}
