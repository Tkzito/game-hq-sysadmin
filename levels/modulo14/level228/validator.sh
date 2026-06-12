#!/bin/bash
set -euo pipefail
if ! grep -qE 'sentinel monitor' /etc/redis/sentinel.conf || ! grep -qE 'sentinel failover' /home/operator/.bash_history; then echo 'Falha: Sentinels Redis para failover automático não configurados ou testados.'; exit 1; fi; echo 'Sucesso: Auto-failover Redis via Sentinel ativo!';
