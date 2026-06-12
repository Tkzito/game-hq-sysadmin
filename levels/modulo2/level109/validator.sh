#!/bin/bash
set -euo pipefail
if [ ! -f "/var/run/lp.restarted" ]; then
    echo "Falha: O serviço de impressão não foi reiniciado."
    exit 1
fi
echo "Sucesso: Serviço de impressão reiniciado via delegação!"
exit 0
