all: build

ci: build test

build: build-app build-server

build-app:
	cd app && elm-package install -y && elm-make --yes src/App.elm

build-server:
	cd server && cargo build

test: test-app test-server

test-app:
	cd app

test-server:
	cd server && cargo test

run-app:
	cd app && elm-reactor

run-server:
	cd server && cargo-watch watch run
