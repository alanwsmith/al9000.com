#!/bin/bash

cargo watch -q -c -x 'test solo -- nocapture --quiet && cargo test -- --nocapture --quiet && cargo clippy --quiet && cargo run --quiet -- samples/cleartext.txt samples/encrypted.txt.bin && cargo run --quiet -- samples/video.webm samples/video.webm.bin'

