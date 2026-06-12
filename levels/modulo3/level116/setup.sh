#!/bin/bash
set -euo pipefail

# Cria os arquivos no /var/log com tamanhos simulados reais
mkdir -p /var/log/nginx

dd if=/dev/zero of=/var/log/syslog bs=1M count=1 2>/dev/null
dd if=/dev/zero of=/var/log/radiologia_sync.log bs=1M count=150 2>/dev/null
dd if=/dev/zero of=/var/log/nginx/access.log bs=1M count=2 2>/dev/null

chown -R operator:operator /home/operator
