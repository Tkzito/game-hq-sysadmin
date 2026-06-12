#!/bin/bash
set -euo pipefail
if ! grep -qE 'certbot' /home/operator/.bash_history; then echo 'Falha: Utilitário certbot não foi executado para gerar certificados.'; exit 1; fi; echo 'Sucesso: Certificado SSL gerado via Let\'s Encrypt!';
