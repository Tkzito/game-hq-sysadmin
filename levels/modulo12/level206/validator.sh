#!/bin/bash
set -euo pipefail
if ! grep -qE 'iam.*role|iam.*policy' /home/operator/.bash_history; then echo 'Falha: Perfis de privilégio mínimo do IAM ausentes.'; exit 1; fi; echo 'Sucesso: Políticas IAM aplicadas com sucesso!';
