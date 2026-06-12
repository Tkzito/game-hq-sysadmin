# Nível 131 — Loops em Lista Estática: A Primeira Repetição

## 🎮 Contexto do Freela
Larissa, a CTO da FreshBox, quer automatizar a rotina diária de verificação de armazenamento dos servidores de aplicação: `app01`, `app02` e `app03`. Atualmente, um operador executa manualmente um comando `ssh` em cada servidor. Loop `for` resolve!

## 🛠️ Missão
1. Crie um script em `/home/operator/check_disks.sh`.
2. O script deve usar um loop `for` para iterar sobre a lista de servidores: `app01`, `app02` e `app03`.
3. Para cada servidor, o script deve rodar: `ssh <servidor> "df -h"` (um mock de SSH está ativo para simular essa resposta).
4. O script deve exibir em tela o andamento ou a saída para cada servidor.
5. Torne o script executável usando `chmod +x /home/operator/check_disks.sh`.

## 💡 Dicas e Exemplo de Estrutura
No Bash, você pode iterar sobre uma lista estática de strings da seguinte forma:
```bash
#!/bin/bash
set -euo pipefail

SERVERS="app01 app02 app03"
for server in $SERVERS; do
    echo "=== Verificando: $server ==="
    ssh "$server" "df -h"
done
```

## 🎯 Critério de Sucesso
* O script `/home/operator/check_disks.sh` deve existir e ser executável (`chmod +x`).
* O script deve conter uma estrutura de loop `for` passando por `app01`, `app02` e `app03`.
* Ao rodar, o script deve imprimir os nomes dos 3 servidores na saída padrão.
