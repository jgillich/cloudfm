use diesel::*;


table! {
    albums {
        id -> Integer,
        name -> VarChar,
    }
}


table! {
    artists {
        id -> Integer,
        name -> VarChar,
    }
}


table! {
    tracks {
        id -> Integer,
        title -> VarChar,
        number -> Integer
    }
}
