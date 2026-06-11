#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/dispositivos.txt
Dispositivo 01 - Estado: Falha critica.
Dispositivo 02 - Estado: Operando normalmente.
O Dispositivo de comunicacao apresentou uma Falha de sincronia.
Falha detectada no Dispositivo 04.
EOF
