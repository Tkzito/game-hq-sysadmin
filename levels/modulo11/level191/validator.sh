#!/bin/bash
set -euo pipefail
if ! grep -qE 'ansible ' /home/operator/.bash_history; then echo 'Falha: Teste a comunicação ad-hoc dos hosts (ansible all -m ping).'; exit 1; fi; echo 'Sucesso: Inventário de comunicação estabelecido!';
