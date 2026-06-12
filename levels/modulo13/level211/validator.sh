#!/bin/bash
set -euo pipefail
if ! grep -qE 'node_exporter' /etc/prometheus/prometheus.yml; then echo 'Falha: Alvo de raspagem do Node Exporter ausente no prometheus.yml.'; exit 1; fi; echo 'Sucesso: Scrape de métricas distribuídas ativo!';
