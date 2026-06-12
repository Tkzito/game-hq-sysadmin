# Nível 134 — Condicionais Avançadas: Verificando o Mundo ao Redor

## 🎮 Contexto do Freela
Para evitar que nosso script de backup falhe no meio do processo ou corrompa arquivos, precisamos realizar uma verificação prévia robusta das condições do sistema de arquivos.

## 🛠️ Missão
Escreva o script `/home/operator/verify_env.sh` que deve:
1. Validar se o arquivo de configuração `/etc/freshbox/backup.conf` existe (use a flag `-f`). Caso não exista, encerre com mensagem de erro e `exit 1`.
2. Validar se o diretório de backups `/mnt/backup` existe (use `-d`). Caso não exista, crie-o usando `mkdir -p /mnt/backup`.
3. Validar se `/var/freshbox/current` é um link simbólico (use `-L`).
4. Validar se o usuário executor tem permissão de escrita em `/mnt/backup` (use `-w`). Se não possuir, saia com `exit 1`.
5. Torne o script executável (`chmod +x`).

## 💡 Dicas e Exemplo de Estrutura
No Bash, usamos os colchetes `[ ]` (ou `[[ ]]`) com operadores de arquivos:
```bash
#!/bin/bash
set -euo pipefail

CONFIG="/etc/freshbox/backup.conf"
BACKUP_DIR="/mnt/backup"
CURRENT_LINK="/var/freshbox/current"

if [ ! -f "$CONFIG" ]; then
    echo "Erro: Configuração não encontrada."
    exit 1
fi

if [ ! -d "$BACKUP_DIR" ]; then
    echo "Criando pasta de backup..."
    mkdir -p "$BACKUP_DIR"
fi

if [ -L "$CURRENT_LINK" ]; then
    echo "O link simbólico existe."
fi

if [ ! -w "$BACKUP_DIR" ]; then
    echo "Erro: Sem permissão de escrita."
    exit 1
fi
```

## 🎯 Critério de Sucesso
* O script `/home/operator/verify_env.sh` deve existir e ser executável.
* Ele deve usar os operadores condicionais do Bash (como `-f` e `-d`).
* O script deve criar o diretório `/mnt/backup` caso ele não exista ao ser executado.
