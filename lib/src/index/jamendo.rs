
use chill;
use jamendo;
use super::{Index, IndexError, Indexer};
use {DecodedTrack, JamendoUri, Uri, User, Error, JamendoBackend};

impl Indexer<JamendoBackend> for Index {
    fn index(db: &chill::Client, user: &User, backend: &JamendoBackend) -> Result<(), Error> {
        let mut decoded: Vec<DecodedTrack> = Vec::new();

        let jamendo = jamendo::Client::new(jamendo::TEST_ID); // FIXME we shall not use TEST_ID

        let jamendo_user = jamendo.get_users().user_name(&backend.user_name).run()?;
        let jamendo_user = jamendo_user.first().ok_or(IndexError::UserNotFound)?;

        for user in jamendo.get_users_tracks().user_id(jamendo_user.id).run()? {
            for track in user.tracks {
                // users/tracks does not include position, so we have to fetch the track again
                if let Some(track) = jamendo.get_tracks().track_id(track.id).run()?.first() {
                    decoded.push(DecodedTrack {
                        artist: track.artist_name.clone(),
                        album: track.album_name.clone(),
                        name: track.name.clone(),
                        number: track.position,
                        uri: Uri::Jamendo(JamendoUri::new(&backend.id, track.id)),
                    });
                }
            }
        }

        Index::take_result(db, &user.db_name(), decoded)?;
        Ok(())
    }
}
