# Nível 57 — Faxina de Espaços (Linhas Vazias)

## 🎮 Contexto do Freela
Arquivos de configuração legados costumam ficar cheios de linhas em branco ou linhas que contêm apenas espaços e tabulações, dificultando a leitura de quem opera.

## 🛠️ Missão
Filtre o arquivo `/home/operator/config_sujeira.conf` eliminando todas as linhas vazias ou que contenham apenas espaços/tabulações. A saída limpa deve ser exibida na tela.

## 📝 Comandos Úteis
*   `grep -v`: Inverte a seleção, exibindo apenas as linhas que NÃO casam com o padrão.
*   `^[[:space:]]*$`: Regex que representa do início `^` ao fim `$` da linha contendo apenas caracteres de espaço.

## 🎯 Critério de Sucesso
O jogador deve usar grep -v para remover todas as linhas vazias ou com apenas espaços em branco.
