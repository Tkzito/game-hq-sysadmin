# Nível 47 — Validação Numérica Rigorosa

## 🎮 Contexto do Freela
Você está escrevendo um script que altera o limite de radiação dos sensores da nave. Um argumento numérico inválido ou nulo pode fritar os circuitos.

## 🛠️ Missão
Crie o script `/home/operator/validar_num.sh` que aceita um argumento obrigatório.
- Se o argumento for nulo ou vazio, printe `ERRO: Argumento ausente.` e saia com exit `1`.
- Se o argumento não for um número inteiro positivo (apenas dígitos de 0 a 9), printe `ERRO: Nao e um numero valido.` e saia com exit `1`.
- Se for um número válido, printe `SUCESSO: Limite definido para <numero>.` e saia com exit `0`.

## 📝 Comandos Úteis
*   `if [ -z "${1:-}" ]; then`: Valida se o primeiro argumento está vazio ou ausente.
*   `[[ "$1" =~ ^[0-9]+$ ]]`: Valida se a string é composta exclusivamente por dígitos numéricos.

## 🎯 Critério de Sucesso
O script `/home/operator/validar_num.sh` deve filtrar adequadamente valores nulos e strings não numéricas, respondendo com a mensagem e exit codes adequados.
