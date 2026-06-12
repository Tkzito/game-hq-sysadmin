# Nível 140 — [DESAFIO INTEGRADO] O Automatizador do FreshBox

## 🎮 Contexto do Freela
Chegou o momento de unificar todas as peças de automação que você criou para a FreshBox. Larissa, a CTO, quer que você monte um sistema robusto de monitoramento inteligente e auto-recuperação de 3 APIs de entrega da FreshBox: `freshbox-api-8081`, `freshbox-api-8082` e `freshbox-api-8083`. O sistema deve monitorar em loops, registrar estados de falhas, alertar e reiniciar os serviços apenas quando necessário, além de rodar via cron e ter rotação de logs configurada.

## 🛠️ Missão
1. Crie o script `/home/operator/freshbox-monitor.sh`. Ele deve ser executável (`chmod +x`).
2. **Monitoramento:** Verifique a saúde das URLs em um array:
   * `http://localhost:8081/health` (aponta para o serviço `freshbox-api-8081`)
   * `http://localhost:8082/health` (aponta para o serviço `freshbox-api-8082`)
   * `http://localhost:8083/health` (aponta para o serviço `freshbox-api-8083`)
3. **Estado Consecutivo de Falhas:** Salve a quantidade de falhas consecutivas de cada endpoint em arquivos de estado individuais no diretório `/tmp/freshbox_state/`. (Exemplo: `/tmp/freshbox_state/api_8081_failures`).
4. **Lógica de Recuperação e Alertas:**
   * Se o endpoint responder com sucesso, exclua o arquivo de estado ou resete o contador para `0`.
   * Se o endpoint falhar:
     * Incremente o contador de falhas consecutivas.
     * Na **2ª falha consecutiva**, emita um alerta gravando uma mensagem no arquivo `/var/log/freshbox/alerts.log`.
     * Na **3ª falha consecutiva**, execute o restart do respectivo serviço usando `systemctl restart <nome-do-serviço>` (ex: `systemctl restart freshbox-api-8083`).
5. **Cron:** Agende a execução desse script monitor a cada 5 minutos no crontab do `operator` (`*/5 * * * *`).
6. **Logrotate:** Crie/garanta a configuração do logrotate em `/etc/logrotate.d/freshbox` com rotação diária, retenção de 30 dias e compressão.

## 💡 Dicas e Exemplo de Estrutura
Para mapear cada URL para seu respectivo serviço e arquivos de estado, use arrays ou lógicas condicionais simples de string:
```bash
#!/bin/bash
set -euo pipefail

# Diretórios
STATE_DIR="/tmp/freshbox_state"
mkdir -p "$STATE_DIR"
ALERT_LOG="/var/log/freshbox/alerts.log"

# Serviços e Portas
PORTS=(8081 8082 8083)

for port in "${PORTS[@]}"; do
    URL="http://localhost:${port}/health"
    SERVICE="freshbox-api-${port}"
    STATE_FILE="${STATE_DIR}/${SERVICE}_failures"
    
    # Obter contador atual
    if [ -f "$STATE_FILE" ]; then
        FAIL_COUNT=$(cat "$STATE_FILE")
    else
        FAIL_COUNT=0
    fi
    
    if curl -sf --max-time 5 "$URL" > /dev/null 2>&1; then
        # Se recuperou/está saudável, limpa
        rm -f "$STATE_FILE"
    else
        # Falhou, incrementa
        FAIL_COUNT=$((FAIL_COUNT + 1))
        echo "$FAIL_COUNT" > "$STATE_FILE"
        
        if [ "$FAIL_COUNT" -eq 2 ]; then
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] ALERTA: $SERVICE falhou 2x seguidas!" >> "$ALERT_LOG"
        elif [ "$FAIL_COUNT" -ge 3 ]; then
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] CRÍTICO: $SERVICE falhou 3x! Reiniciando..." >> "$ALERT_LOG"
            systemctl restart "$SERVICE"
            # Opcional: pode resetar ou manter o contador dependendo de sua estratégia de retry
        fi
    fi
done
```

## 🎯 Critério de Sucesso
* O script `/home/operator/freshbox-monitor.sh` deve existir e ser executável.
* Ele deve rastrear estados consecutivos de falha sob `/tmp/freshbox_state/`.
* Na 2ª falha de um serviço (como simulado no teste do validador para `freshbox-api-8083`), deve gravar um alerta no arquivo `/var/log/freshbox/alerts.log`.
* Na 3ª falha de um serviço, o script deve invocar o `systemctl restart` para o serviço correto.
* O cron deve estar agendado para rodar o script a cada 5 minutos.
* O logrotate deve estar configurado corretamente em `/etc/logrotate.d/freshbox`.
