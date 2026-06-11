# Nível 37 — Redirecionando Erros (stderr) de Depuração

## 🎮 Contexto do Freela
No Bash, existem diferentes descritores de arquivos de saída. O descritor `1` é o `stdout` (saída padrão, onde mensagens de sucesso e respostas normais trafegam). O descritor `2` é o `stderr` (saída de erro padrão, para avisos de falha e depuração). O script `/home/operator/check_ports.sh` realiza varreduras de portas mas exibe mensagens de avisos e erros misturadas no console, o que confunde o operador.

## 🛠️ Missão
Edite o arquivo `/home/operator/check_ports.sh` de modo que todas as mensagens enviadas para a saída de erro (`stderr`, descritor `2`) sejam automaticamente redirecionadas para o arquivo `/home/operator/error.log`. 
*   **Requisito**: A saída padrão (`stdout`) contendo as portas abertas deve continuar aparecendo no terminal do operador. Apenas as saídas de erro devem ser salvas silenciosamente no arquivo.
*   **Dica**: Você pode usar o redirecionador `exec 2> /home/operator/error.log` logo no início do script para capturar automaticamente toda a saída de erro gerada pelas linhas subsequentes.

## 📝 Comandos Úteis
*   `2>`: Redireciona a saída de erro padrão (stderr / descritor 2) para um arquivo.
*   `exec 2> arquivo`: Redireciona permanentemente o fluxo de erros de todo o script daquele ponto em diante.

## 🎯 Critério de Sucesso
Ao rodar `./check_ports.sh`, as linhas com `[AVISO]` e `[ERRO]` não devem aparecer no console, e sim estar registradas exatamente no arquivo `/home/operator/error.log`. O terminal deve exibir apenas as mensagens padrão de sucesso.
