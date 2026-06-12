#!/bin/bash
set -euo pipefail
if [ ! -d /home/operator/ansible/group_vars ] && [ ! -d /home/operator/ansible/host_vars ]; then echo 'Falha: Diretórios de host_vars ou group_vars não encontrados.'; exit 1; fi; echo 'Sucesso: Escopo de variáveis por grupos ativado!';
