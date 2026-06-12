#!/bin/bash
set -euo pipefail
if ! grep -qE 'replicaof|slaveof' /etc/redis/redis.conf; then echo 'Falha: Replicação primário-secundário Redis não configurada.'; exit 1; fi; echo 'Sucesso: Redundância de cache Redis ativa!';
