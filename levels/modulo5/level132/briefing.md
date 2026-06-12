# Nível 132 — Loops em Arquivos e Saída de Comandos

## 🎮 Contexto do Freela
A FreshBox armazena arquivos de log que se acumulam diariamente no diretório `/var/log/freshbox/`. Para poupar espaço em disco, precisamos de um script automatizado que encontre todos os arquivos `.log` com mais de 1 dia de vida e os compacte com `gzip`.

## 🛠️ Missão
1. Crie o script em `/home/operator/compress_logs.sh`.
2. O script deve iterar sobre todos os arquivos de extensão `.log` no diretório `/var/log/freshbox/` que tenham sido modificados há mais de 1 dia (use `find` com a flag `-mtime +1`).
3. Para cada arquivo correspondente encontrado, execute `gzip <arquivo>`.
4. Garanta que o script seja executável com `chmod +x /home/operator/compress_logs.sh`.

## 💡 Dicas e Exemplo de Estrutura
Para iterar na saída de um comando em Bash, use a substituição de comando `$(...)`:
```bash
#!/bin/bash
set -euo pipefail

LOG_DIR="/var/log/freshbox"

for log_file in $(find "$LOG_DIR" -name "*.log" -mtime +1); do
    echo "Comprimindo: $log_file"
    gzip "$log_file"
done
```

## 🎯 Critério de Sucesso
* O script `/home/operator/compress_logs.sh` deve existir e ter permissão de execução.
* Apenas arquivos `.log` antigos (modificados há mais de 1 dia) devem ser convertidos em `.gz` pelo script.
* Arquivos de log criados recentemente (como `new.log`) não devem ser comprimidos.
