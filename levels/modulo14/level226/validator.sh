#!/bin/bash
set -euo pipefail
if ! grep -qE 'CREATE PUBLICATION|CREATE SUBSCRIPTION' /home/operator/.bash_history; then echo 'Falha: Comandos SQL de replicação lógica (pub/sub) não executados.'; exit 1; fi; echo 'Sucesso: Replicação lógica de tabelas ativa!';
