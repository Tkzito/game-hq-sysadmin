#!/bin/bash
set -euo pipefail
if ! grep -qE 'archive_mode = on' /etc/postgresql/postgresql.conf || ! grep -qE 'archive_command' /etc/postgresql/postgresql.conf; then echo 'Falha: WAL archiving contínuo para PITR desativado.'; exit 1; fi; echo 'Sucesso: Continuous archiving para recuperação point-in-time ativo!';
