#!/bin/bash
set -euo pipefail
if ! grep -qE 'pg_dump.*-j|pg_dump.*-F' /home/operator/.bash_history; then echo 'Falha: Backup físico condensado pg_dump com compressão e threads não executado.'; exit 1; fi; echo 'Sucesso: Dumps de banco gerados com sucesso!';
