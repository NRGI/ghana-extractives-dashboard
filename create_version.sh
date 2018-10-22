#!/usr/bin/env bash

cat > public/version.txt << EOF
{
  "commit_sha": "$COMMIT",
  "image": "nrgi/ghana-extractive-dashboard:$BRANCH.$COMMIT"
}
EOF
