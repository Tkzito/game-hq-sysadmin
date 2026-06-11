#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 2
set -euo pipefail

# Criar uma pasta oculta e alguns subdiretórios para simular arquivos de sistema
mkdir -p /home/operator/sistema/logs
mkdir -p /home/operator/estudos/scripts
mkdir -p /home/operator/.config_aura

echo "Log do núcleo carregado com sucesso." > /home/operator/sistema/logs/boot.log
echo "Configuração de rede neural ativa." > /home/operator/.config_aura/AURA.conf

# Dar permissões ao usuário operator
chown -R operator:operator /home/operator/
chmod -R 755 /home/operator/
