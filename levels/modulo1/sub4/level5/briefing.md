# Nível 35 — Limpeza Segura com 'trap'

## 🎮 Contexto do Freela
Quando executamos scripts administrativos, frequentemente precisamos criar arquivos e diretórios temporários para processamento. Se o script falhar no meio do caminho, ou se o operador cancelar com `Ctrl+C` (SIGINT), estes arquivos confidenciais ficam jogados no disco rígido. O utilitário `trap` do Bash nos permite capturar sinais do sistema e saídas (`EXIT`), garantindo que uma rotina de limpeza seja executada sob qualquer circunstância de finalização.

## 🛠️ Missão
Edite o arquivo `/home/operator/cleanup.sh` para registrar um gatilho de limpeza:
1. Adicione a instrução `trap` para interceptar os sinais `EXIT` (saída normal ou erro), `INT` (SIGINT, vulgo Ctrl+C) e `TERM` (SIGTERM).
2. O `trap` deve chamar a função `limpar_arquivos` declarada no script.
3. Certifique-se de que ao executar `./cleanup.sh`, a saída contenha a mensagem `Executando limpeza de segurança...` e o diretório `/home/operator/tmp_run/` seja removido do disco.

## 📝 Comandos Úteis
*   `trap [ação] [sinais]`: Registra uma ação (geralmente uma função ou comando simples) para rodar quando o script receber determinados sinais ou sair.
    *   Exemplo: `trap limpar_arquivos EXIT INT TERM`

## 🎯 Critério de Sucesso
O diretório `/home/operator/tmp_run/` não deve existir após a execução do script e a mensagem de limpeza deve ser exibida no terminal.
