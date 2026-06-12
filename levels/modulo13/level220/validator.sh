#!/bin/bash
set -euo pipefail
if ! grep -qE 'node_exporter' /etc/prometheus/prometheus.yml || ! grep -qE 'alert:' /etc/prometheus/*.yml; then echo 'Falha: Configurações de NOC integradas incompletas.'; exit 1; fi; echo 'Sucesso: Centro de operações (NOC) reativado e integrado!';
