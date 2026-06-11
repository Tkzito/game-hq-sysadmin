#!/bin/bash
# setup.sh - Nível 27
set -euo pipefail

# Criar estrutura aninhada complexa
mkdir -p /home/operator/sistema/modulo_a/submodulo_x/config
mkdir -p /home/operator/sistema/core/seguranca/chaves
mkdir -p /home/operator/sistema/logs/backup/diario

# Arquivos de lixo
echo "random config" > /home/operator/sistema/modulo_a/submodulo_x/config/app.conf
echo "dummy file" > /home/operator/sistema/core/seguranca/dummy.txt
echo "log data" > /home/operator/sistema/logs/backup/diario/out.log

# O arquivo chave que deve ser encontrado (.pem)
echo "-----BEGIN RSA PRIVATE KEY-----" > /home/operator/sistema/core/seguranca/chaves/aura_private_key.pem
echo "MIIEowIBAAKCAQEA0yGx..." >> /home/operator/sistema/core/seguranca/chaves/aura_private_key.pem
echo "-----END RSA PRIVATE KEY-----" >> /home/operator/sistema/core/seguranca/chaves/aura_private_key.pem

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
