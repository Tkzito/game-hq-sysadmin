# Nível 139 — Healthcheck com Restart Automático

## 🎮 Contexto do Freela
O serviço `freshbox-api` ocasionalmente trava em produção por vazamento de memória. Enquanto os desenvolvedores não corrigem o bug, precisamos criar uma solução de auto-recuperação (self-healing): um script que detecta quando o serviço está inacessível e o reinicia automaticamente usando o `systemctl`.

## 🛠️ Missão
Escreva o script `/home/operator/healthcheck_restart.sh` que faça o seguinte:
1. Verifique a saúde do serviço no endpoint `http://localhost:8080/health` usando o `curl`.
2. Se o healthcheck responder com sucesso, registre a informação no arquivo `/var/log/freshbox/healthcheck.log` e finalize.
3. Se o healthcheck falhar (o mock do curl simulará falhas nas duas primeiras tentativas), execute o comando `systemctl restart freshbox-api` para reiniciar o serviço.
4. Escreva no log todas as ações tomadas com timestamp e mensagens adequadas (ex: quando falhar e quando reiniciar).
5. Torne o script executável (`chmod +x`).

## 💡 Dicas e Exemplo de Estrutura
```bash
#!/bin/bash
set -euo pipefail

SERVICE_NAME="freshbox-api"
HEALTH_URL="http://localhost:8080/health"
LOG_FILE="/var/log/freshbox/healthcheck.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$1] $2" >> "$LOG_FILE"
}

log "INFO" "Iniciando verificação..."

if curl -sf --max-time 5 "$HEALTH_URL" > /dev/null 2>&1; then
    log "INFO" "Serviço respondendo corretamente."
    exit 0
else
    log "WARN" "Serviço offline! Reiniciando..."
    systemctl restart "$SERVICE_NAME"
    log "INFO" "Comando de restart enviado."
fi
```

## 🎯 Critério de Sucesso
* O script `/home/operator/healthcheck_restart.sh` deve existir e ser executável.
* O script deve fazer requisições via `curl` ao endpoint indicado.
* O script deve invocar `systemctl restart freshbox-api` quando a verificação falhar.
* Os logs das tentativas devem ser gravados em `/var/log/freshbox/healthcheck.log`.
