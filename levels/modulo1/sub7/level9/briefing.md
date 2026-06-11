# Nível 69 — Abortando com set -u

## 🎮 Contexto do Freela
Para evitar erros catastróficos causados por digitação incorreta de nomes de variáveis, usamos `set -u`. Isso faz com que o interpretador aborte a execução imediatamente se encontrar uma variável não declarada.

## 🛠️ Missão
Crie o script `/home/operator/seguro.sh` e ative o modo rígido de checagem de variáveis não declaradas (`set -u`).
O script deve tentar imprimir o valor de duas variáveis:
1. `NOME_DE_TESTE` (que estará definida no ambiente).
2. `VARIAVEL_INEXISTENTE` (que não estará declarada).

## 📝 Comandos Úteis
*   `set -u` no início do script.

## 🎯 Critério de Sucesso
O script `/home/operator/seguro.sh` deve possuir `set -u` ativo, imprimir a primeira variável e falhar com erro de variável não definida na segunda.
