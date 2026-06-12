#!/bin/bash
set -euo pipefail
if ! grep -qE 'pipelining.*True' /home/operator/ansible/ansible.cfg; then echo 'Falha: Pipelining de conexões SSH não ativado no ansible.cfg.'; exit 1; fi; echo 'Sucesso: Conexões de rede otimizadas!';
