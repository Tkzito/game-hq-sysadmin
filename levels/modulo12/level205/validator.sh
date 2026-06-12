#!/bin/bash
set -euo pipefail
if ! grep -qE 's3 mb|create-bucket' /home/operator/.bash_history; then echo 'Falha: Bucket S3 não criado.'; exit 1; fi; echo 'Sucesso: Bucket de arquivos estáticos ativo!';
