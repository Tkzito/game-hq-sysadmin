#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/tokens.txt
1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e
INVALID_TOKEN_WITH_WORDS
8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c
8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3g
EOF
