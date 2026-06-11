# Nível 32 — Rastreamento de Execução com 'bash -x'

## 🎮 Contexto do Freela
O script de sincronização de logs da estação solar (`/home/operator/sync.sh`) está exibindo mensagens de erro informando que o servidor está offline, embora as luzes de conectividade física estejam todas verdes. O script roda silenciosamente, dificultando entender qual decisão o interpretador Bash está tomando internamente.

## 🛠️ Missão
1. Investigue a execução do script utilizando o modo de rastreamento (trace) do bash para ver passo a passo quais linhas e testes lógicos estão sendo executados e os valores das variáveis locais.
2. Identifique onde a lógica de decisão condicional do `if` foi invertida em relação à variável `CONN_STATUS` (onde `1` significa online e `0` offline).
3. Corrija o script `/home/operator/sync.sh` para que ele conclua com sucesso exibindo a mensagem "Status de conexão OK. Sincronizando logs...".

## 📝 Comandos Úteis
*   `bash -x [script.sh]`: Executa o script exibindo cada comando que está sendo avaliado precedido pelo símbolo `+`. É a forma clássica de depurar o fluxo do Bash em tempo de execução.
*   Você também pode habilitar o modo de depuração dentro do próprio script inserindo a linha `set -x` antes do bloco que deseja analisar (e `set +x` para desligar).

## 🎯 Critério de Sucesso
O comando `./sync.sh` deve rodar com sucesso e exibir "Status de conexão OK. Sincronizando logs...".
