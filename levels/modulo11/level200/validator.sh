#!/bin/bash
set -euo pipefail
if ! grep -qE 'roles:' /home/operator/ansible/site.yml || ! grep -qE '\$ANSIBLE_VAULT' /home/operator/ansible/*.yml; then echo 'Falha: Playbook integrado não atende de forma combinada a roles e vault.'; exit 1; fi; echo 'Sucesso: Orquestrador Ansible implantado com sucesso!';
