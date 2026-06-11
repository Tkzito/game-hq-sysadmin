# Nível 39 — Criando Scripts com Modo Verboso (Debug)

## 🎮 Contexto do Freela
Para facilitar a depuração em servidores de produção sem poluir a saída de logs diários, engenheiros de DevOps costumam incluir chaves de verbosidade ("Modo Debug") em seus scripts. A ideia é que o script execute silenciosamente exibindo apenas o resultado essencial, a menos que o operador ative explicitamente o modo de depuração usando uma flag de linha de comando (CLI) ou uma variável de ambiente.

## 🛠️ Missão
Edite o arquivo `/home/operator/monitor.sh` para suportar o modo verbose:
1. Altere a inicialização do script para que a variável interna `DEBUG_MODE` receba o valor `1` caso:
   *   O primeiro argumento passado para o script (`$1`) seja igual a `-d`.
   *   **OU** se a variável de ambiente `DEBUG` estiver setada como `1` (ex: `DEBUG=1 ./monitor.sh`).
2. Se nenhuma das condições for atendida, `DEBUG_MODE` deve permanecer `0` (silencioso).
3. Teste o funcionamento executando `./monitor.sh`, `./monitor.sh -d` e `DEBUG=1 ./monitor.sh`.

## 📝 Comandos Úteis
*   `$1`: Primeiro argumento da linha de comando recebido pelo script.
*   `${DEBUG:-}`: Expande a variável de ambiente `DEBUG` de forma segura (mesmo se estiver desativada pelo `set -u`).
*   Operadores lógicos em testes bash: `||` (OU) e `&&` (E) podem ser combinados.
    *   Exemplo estrutural:
        ```bash
        if [ "$1" = "-d" ] || [ "${DEBUG:-}" = "1" ]; then
            DEBUG_MODE=1
        fi
        ```

## 🎯 Critério de Sucesso
O comando `./monitor.sh` deve exibir apenas `STATUS MEMORIA: OK`. Com a flag `-d` ou `DEBUG=1`, ele deve imprimir as linhas adicionais com `DEBUG:` antes do relatório de status.
