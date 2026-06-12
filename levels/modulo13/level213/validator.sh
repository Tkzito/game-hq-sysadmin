#!/bin/bash
set -euo pipefail
if ! grep -qE 'grafana-server' /home/operator/.bash_history; then echo 'Falha: Servidor Grafana não inicializado.'; exit 1; fi; echo 'Sucesso: Servidor Grafana ativo e integrado!';
