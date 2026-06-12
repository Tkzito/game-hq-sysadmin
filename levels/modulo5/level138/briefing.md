# Nível 138 — Logs Automáticos: Registrando o que Aconteceu

## 🎮 Contexto do Freela
Nossos logs estão crescendo desordenadamente. Precisamos que nossos scripts registrem suas saídas em arquivos nomeados dinamicamente com base na data do dia. Além disso, precisamos configurar a rotação de logs automática usando o `logrotate` para evitar que esses arquivos preencham totalmente o disco.

## 🛠️ Missão
1. Crie o script `/home/operator/log_monitor.sh`. O script deve gerar logs no arquivo `/var/log/freshbox/healthcheck-YYYY-MM-DD.log` (substituindo YYYY-MM-DD pela data atual em formato ano-mês-dia).
2. Configure um arquivo de rotação de log em `/etc/logrotate.d/freshbox` com as seguintes regras para `/var/log/freshbox/*.log`:
   * Rotação diária (`daily`).
   * Manter 30 backups antigos (`rotate 30`).
   * Compactar os arquivos de log rotacionados (`compress`).
3. Torne o script executável (`chmod +x`).

## 💡 Dicas e Exemplo de Estrutura
No Bash, você pode gerar a data do dia com `date +%Y-%m-%d`.
Exemplo do script `/home/operator/log_monitor.sh`:
```bash
#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/freshbox/healthcheck-$(date +%Y-%m-%d).log"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] INFO: Executando verificação de rotina" >> "$LOG_FILE"
```

Exemplo da configuração do `logrotate` em `/etc/logrotate.d/freshbox`:
```text
/var/log/freshbox/*.log {
    daily
    rotate 30
    compress
    missingok
    notifempty
    create 0644 operator operator
}
```

## 🎯 Critério de Sucesso
* O script `/home/operator/log_monitor.sh` deve existir e ser executável.
* Ele deve gerar logs no arquivo com a data de hoje.
* O arquivo `/etc/logrotate.d/freshbox` deve existir e conter as diretivas de rotação (`rotate 30`, `compress`, etc.).
* A sintaxe da configuração do logrotate deve passar no teste de validação (`logrotate -d /etc/logrotate.d/freshbox` não deve retornar erros).
