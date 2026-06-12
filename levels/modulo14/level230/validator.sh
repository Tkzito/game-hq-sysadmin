#!/bin/bash
set -euo pipefail
if ! grep -qE 'pg_ctl promote' /home/operator/.bash_history; then echo 'Falha: A réplica de leitura não foi promovida a master (rode pg_ctl promote).'; exit 1; fi; echo 'Sucesso: Failover de banco promovido com zero downtime!';
