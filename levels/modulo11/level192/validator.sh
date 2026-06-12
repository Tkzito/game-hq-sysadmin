#!/bin/bash
set -euo pipefail
if ! grep -qE 'apt|package|yum' /home/operator/ansible/site.yml || ! grep -qE 'ansible-playbook' /home/operator/.bash_history; then echo 'Falha: Playbook para instalação do vim não configurado ou executado.'; exit 1; fi; echo 'Sucesso: Playbook idempotente aplicado com sucesso!';
