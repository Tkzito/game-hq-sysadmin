#!/bin/bash
set -euo pipefail
if ! grep -qE 'shared_buffers|max_connections = 500' /etc/postgresql/postgresql.conf; then echo 'Falha: Parâmetros de performance de conexões e buffers do PostgreSQL não configurados.'; exit 1; fi; echo 'Sucesso: Tuning do banco de dados concluído!';
