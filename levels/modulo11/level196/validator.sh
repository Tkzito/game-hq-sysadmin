#!/bin/bash
set -euo pipefail
if [ ! -d /home/operator/ansible/roles ] || [ ! -f /home/operator/ansible/roles/common/tasks/main.yml ]; then echo 'Falha: A estrutura de Roles do Ansible (roles/common/tasks/main.yml) não foi criada.'; exit 1; fi; echo 'Sucesso: Lógica organizada em papéis (roles) reutilizáveis!';
