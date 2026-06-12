#!/bin/bash
set -euo pipefail
if ! grep -qE 'terraform refresh|terraform import' /home/operator/.bash_history; then echo 'Falha: O drift não foi detectado (rode terraform refresh).'; exit 1; fi; echo 'Sucesso: Sincronia de estado estabelecida!';
