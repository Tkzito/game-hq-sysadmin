#!/bin/bash
set -euo pipefail
if ! grep -qE 'nginx|systemctl start nginx' /home/operator/.bash_history; then echo 'Falha: Você precisa iniciar o Nginx como servidor web.'; exit 1; fi; echo 'Sucesso: Servidor Web Nginx inicializado!';
