#!/bin/bash
set -euo pipefail
if ! grep -qE 'jmx_exporter|jvm' /etc/prometheus/prometheus.yml; then echo 'Falha: Coleta de métricas internas da JVM/Runtime ausente.'; exit 1; fi; echo 'Sucesso: Monitoramento JVM integrado!';
