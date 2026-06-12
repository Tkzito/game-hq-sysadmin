#!/bin/bash
set -euo pipefail
gpasswd -d auxiliar lp 2>/dev/null || true
