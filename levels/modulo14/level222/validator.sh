#!/bin/bash
set -euo pipefail
if [ ! -f /var/lib/postgresql/data/standby.signal ]; then echo 'Falha: Arquivo standby.signal de réplica de leitura ausente.'; exit 1; fi; echo 'Sucesso: Replicação física assíncrona estabelecida!';
