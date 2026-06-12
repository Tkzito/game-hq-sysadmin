#!/bin/bash
set -euo pipefail
if ! grep -qE 'pyroscope' /home/operator/.bash_history; then echo 'Falha: Agente pyroscope para profiles contínuos de código não executado.'; exit 1; fi; echo 'Sucesso: flamegraphs integrados no profile de CPU!';
