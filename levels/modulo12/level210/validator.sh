#!/bin/bash
set -euo pipefail
if grep -qE 'default' /home/operator/deploy.sh; then echo 'Falha: O script ainda contém referências de Security Group inválidas.'; exit 1; fi; echo 'Sucesso: Rede AWS isolada corrigida e validada!';
