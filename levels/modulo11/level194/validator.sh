#!/bin/bash
set -euo pipefail
if ! grep -qE 'notify:' /home/operator/ansible/site.yml || ! grep -qE 'handlers:' /home/operator/ansible/site.yml; then echo 'Falha: Mecanismo de notificação (handlers) ausente no playbook.'; exit 1; fi; echo 'Sucesso: Reinicialização condicional de serviços configurada!';
