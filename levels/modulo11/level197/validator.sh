#!/bin/bash
set -euo pipefail
if ! grep -qE '\$ANSIBLE_VAULT' /home/operator/ansible/credentials.yml; then echo 'Falha: Credenciais não criptografadas. Use ansible-vault encrypt.'; exit 1; fi; echo 'Sucesso: Chaves confidenciais protegidas por criptografia!';
