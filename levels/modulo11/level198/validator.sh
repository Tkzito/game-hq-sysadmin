#!/bin/bash
set -euo pipefail
if ! grep -qE 'delegate_to|local_action' /home/operator/ansible/site.yml; then echo 'Falha: Delegação de tarefas locais/remotas ausente no playbook.'; exit 1; fi; echo 'Sucesso: Roteamento de comandos intermediários executado!';
