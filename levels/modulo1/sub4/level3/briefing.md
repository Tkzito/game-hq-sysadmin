# Nível 33 — Analisando Códigos de Saída com '$?'

## 🎮 Contexto do Freela
No ecossistema Linux/Bash, todo comando concluído retorna um código numérico de saída (exit code) para o sistema operacional. O valor `0` indica sucesso absoluto, enquanto qualquer valor de `1` a `255` indica algum tipo de erro ou condição especial. O script `/home/operator/check_service.sh` deve monitorar se o serviço de energia solar está rodando executando o utilitário de teste `/home/operator/ping_target.sh`, ler seu código de retorno e reportar o estado de forma limpa.

## 🛠️ Missão
Edite o arquivo `/home/operator/check_service.sh` para capturar dinamicamente o código de saída retornado pelo comando `/home/operator/ping_target.sh`.
1. A captura do código de saída deve ocorrer imediatamente após a execução do `/home/operator/ping_target.sh` utilizando a variável reservada do bash `$?`.
2. Se o código de saída for `0` (sucesso), imprima `SERVICO ONLINE` na tela e encerre o script com o código de saída `0` (`exit 0`).
3. Se o código de saída for diferente de `0` (falha), imprima `SERVICO OFFLINE` na tela e encerre o script com o código de saída `1` (`exit 1`).

## 📝 Comandos Úteis
*   `$?`: Variável interna que guarda o status de retorno do último comando executado.
    *   Exemplo:
        ```bash
        ./comando_qualquer
        RETORNO=$?
        if [ $RETORNO -eq 0 ]; then ...
        ```
*   `exit [N]`: Finaliza o script retornando o código de erro/sucesso `N`.

## 🎯 Critério de Sucesso
O script `/home/operator/check_service.sh` deve retornar código `0` e imprimir `SERVICO ONLINE` se o ping funcionar, ou retornar código `1` e imprimir `SERVICO OFFLINE` se o ping falhar.
