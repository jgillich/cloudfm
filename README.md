# cloudfm

The cloud-aware music player.

[![Build Status](https://travis-ci.org/cloudfm/cloudfm.svg?branch=master)](https://travis-ci.org/cloudfm/cloudfm)

### Hacking

We use the [Nix](http://nixos.org/nix/) package manager for development, so make
sure you grab it first. Then, switch to the project folder and type:

    nix-shell .

This will put you in a shell with all dependencies available. There are also a
few new commands: `build`, `run` and `test`.

There is one more thing: Configuring a database. Either create a `.env` file or
set the following as environment variable:

    DATABASE_URL=/tmp/mp.sqlite

And then run `diesel migration run` to apply the migrations.
