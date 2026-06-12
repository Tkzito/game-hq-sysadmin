#!/bin/bash
set -euo pipefail
if ! grep -qE 'blackbox_exporter|blackbox' /etc/prometheus/prometheus.yml; then echo 'Falha: Configuração de monitoramento Blackbox externa ausente.'; exit 1; fi; echo 'Sucesso: Teste de latência externa TCP/HTTP ativo!';
