#!/bin/bash
set -euo pipefail
if ! grep -qE 'alert:|expr:' /etc/prometheus/rules.yml; then echo 'Falha: Alertas e expressões lógicas ausentes no rules.yml do Prometheus.'; exit 1; fi; echo 'Sucesso: Alertas automáticos do Alertmanager configurados!';
