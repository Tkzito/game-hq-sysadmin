# Nível 43 — Iterando sobre a Equipe

## 🎮 Contexto do Freela
Você recebeu uma lista dinâmica de tarefas a serem ativadas no sistema de suporte de vida. O número de tarefas varia a cada ciclo.

## 🛠️ Missão
Escreva o script `/home/operator/listar.sh`. Ele deve iterar sobre todos os argumentos passados na chamada do script (usando `$@`) e imprimir cada um deles em uma linha separada, precedido por `Tarefa: `.
Por exemplo, ao rodar `./listar.sh oxigenio energia aqua`, a saída deve ser:
`Tarefa: oxigenio`
`Tarefa: energia`
`Tarefa: aqua`

## 📝 Comandos Úteis
*   `for item in "$@"; do`: Loop para iterar sobre todos os argumentos.

## 🎯 Critério de Sucesso
O script `/home/operator/listar.sh` deve processar e listar individualmente todos os argumentos passados.
