#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/contatos.db
Id: 1, Nome: Joao, Contato: joao.silva@empresa.com, Cargo: Dev
Id: 2, Nome: Maria, Contato: maria@provedor.net, Cargo: SRE
Id: 3, Nome: Aura, Contato: aura7@core.org, Cargo: IA
EOF
