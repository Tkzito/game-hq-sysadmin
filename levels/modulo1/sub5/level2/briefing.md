# Nível 42 — Contagem de Tripulantes

## 🎮 Contexto do Freela
O sistema de segurança precisa de exatamente 3 parâmetros de verificação para autenticar a equipe de manutenção. Se menos argumentos forem fornecidos, o acesso deve ser bloqueado por segurança.

## 🛠️ Missão
Crie o script `/home/operator/contar.sh`. Ele deve verificar o número total de argumentos fornecidos usando `$#`.
- Se o número de argumentos for menor que 3, printe `ERRO: Minimo de 3 argumentos necessarios.` e retorne exit code `1`.
- Se for 3 ou mais, printe `OK: <numero> argumentos recebidos.` (substituindo `<numero>` pela quantidade total) e retorne exit code `0`.

## 📝 Comandos Úteis
*   `$#`: Variável que contém a quantidade de parâmetros passados.
*   `if [ "$#" -lt 3 ]; then ...`: Estrutura condicional para comparar números.

## 🎯 Critério de Sucesso
O script `/home/operator/contar.sh` deve validar corretamente a quantidade de parâmetros e retornar o exit code correto.
