#!/bin/bash
set -euo pipefail
if ! grep -qE 'pool_mode = transaction' /etc/pgbouncer/pgbouncer.ini; then echo 'Falha: Pool mode de transação rápida no PgBouncer não configurado.'; exit 1; fi; echo 'Sucesso: Pool de conexões do PgBouncer ativo!';
