#!/bin/bash
set -euo pipefail
if ! grep -qE 'run-instances.*--user-data' /home/operator/.bash_history; then echo 'Falha: EC2 não lançada ou scripts de User Data ausentes.'; exit 1; fi; echo 'Sucesso: Instância com provimento automático de boot criada!';
