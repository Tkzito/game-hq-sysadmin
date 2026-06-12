#!/bin/bash
set -euo pipefail
if ! grep -qE 'loop:|with_items' /home/operator/ansible/site.yml || ! grep -qE 'template:' /home/operator/ansible/site.yml; then echo 'Falha: Loops ou templates Jinja2 não encontrados no playbook.'; exit 1; fi; echo 'Sucesso: Templates dinâmicos gerados em loops!';
