#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/sistema.log
[INFO] Servico iniciado.
[CRITICAL] Falha na pressao da cabine!
[WARNING] Nivel de bateria 80%.
[FATAL] Perda de comunicacao com o modulo propulsor!
[DEBUG] Carregando modulos de rede.
EOF
