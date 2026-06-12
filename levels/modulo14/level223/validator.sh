#!/bin/bash
set -euo pipefail
if ! grep -qE 'hot_standby = on' /etc/postgresql/postgresql.conf; then echo 'Falha: Permissão de réplica de leitura (hot_standby = on) desativada.'; exit 1; fi; echo 'Sucesso: Réplicas de leitura integradas com sucesso!';
