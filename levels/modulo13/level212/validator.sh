#!/bin/bash
set -euo pipefail
if ! grep -qE 'rate\(|sum\(' /home/operator/.bash_history; then echo 'Falha: Consultas de tráfego com rate/sum em PromQL não executadas.'; exit 1; fi; echo 'Sucesso: queries PromQL validadas!';
