#!/bin/bash

cargo watch -q -c -x 'clippy && cargo run | tee output.inc.txt'

