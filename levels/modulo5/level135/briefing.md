# Nível 135 — Funções Modulares Reutilizáveis

## 🎮 Contexto do Freela
Nosso time está escrevendo muitos scripts redundantes. Para mantermos a base de código organizada e legível, precisamos refatorar os scripts da FreshBox com funções modulares reutilizáveis, garantindo boas práticas de escopo de variáveis.

## 🛠️ Missão
Escreva o script `/home/operator/modular_monitor.sh` que deve:
1. Conter uma função `check_service` que recebe a URL do serviço e usa `curl` para testar.
2. Conter uma função `notify_failure` que adiciona a URL falha no arquivo `/var/log/freshbox/failures.log`.
3. Usar variáveis locais (`local varname="valor"`) dentro das funções para evitar vazamento de escopo.
4. Iterar sobre a lista de endpoints: `http://app01/health`, `http://app02/health`, e `http://db01`.
5. Se uma verificação falhar (como ocorrerá com `db01` devido ao mock do curl), chamar `notify_failure` para registrar no log.
6. Tornar o script executável (`chmod +x`).

## 💡 Dicas e Exemplo de Estrutura
```bash
#!/bin/bash
set -euo pipefail

# Função para logging
log() {
    local level="$1"
    local message="$2"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $message"
}

check_service() {
    local url="$1"
    # curl -sf retorna exit code 0 em sucesso, ou não-zero em erro
    curl -sf "$url" > /dev/null 2>&1
}

notify_failure() {
    local service="$1"
    log "ERROR" "Serviço offline: $service"
    echo "$service" >> /var/log/freshbox/failures.log
}

# Lista de serviços
SERVICES=("http://app01/health" "http://app02/health" "http://db01")

for service in "${SERVICES[@]}"; do
    if check_service "$service"; then
        log "INFO" "OK: $service"
    else
        notify_failure "$service"
    fi
done
```

## 🎯 Critério de Sucesso
* O script `/home/operator/modular_monitor.sh` deve existir e ser executável.
* O script deve conter a palavra-chave `local` para definir variáveis locais nas funções.
* A execução do script deve registrar a falha do serviço `db01` em `/var/log/freshbox/failures.log`.
