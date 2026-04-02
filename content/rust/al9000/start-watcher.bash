#!/bin/bash

watchexec\
  --project-origin .\
  -c\
  -r\
  -e rs\
  "bash -c 'cargo test -- --nocapture && cargo run'"
