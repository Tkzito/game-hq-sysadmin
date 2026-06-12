#!/bin/bash
set -euo pipefail
if ! grep -qE 'jaeger|spans|traces' /home/operator/.bash_history; then echo 'Falha: Consultas forenses de traces distribuídos no Jaeger não efetuadas.'; exit 1; fi; echo 'Sucesso: Jaeger rastreou os gargalos de microsserviços!';
