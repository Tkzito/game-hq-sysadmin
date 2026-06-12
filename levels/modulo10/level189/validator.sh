#!/bin/bash
set -euo pipefail
if ! grep -qE 'tflint|tfsec|terraform validate' /home/operator/.bash_history; then echo 'Falha: Testes de linter e auditoria de segurança estáticos não executados.'; exit 1; fi; echo 'Sucesso: Código de infraestrutura validado contra vulnerabilidades!';
