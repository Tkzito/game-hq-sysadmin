#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 10 (O Primeiro Diagnóstico)
set -euo pipefail

# Cria a estrutura do diretório oculto
mkdir -p /home/operator/.bunker_config/sistema/scripts

# Cria o script de ativação de coolers
cat << 'EOF' > /home/operator/.bunker_config/sistema/scripts/ligar_coolers.sh
echo "⚙️ [SYSTEM] Ativando exaustores auxiliares do Bunker 7..."
echo "🌬️ [PNEUMA] Fluxo de O2 normalizado em 21%."
EOF

# Define permissões iniciais sem execução
chmod 644 /home/operator/.bunker_config/sistema/scripts/ligar_coolers.sh

# Garante a posse de arquivos para o operador
chown -R operator:operator /home/operator
