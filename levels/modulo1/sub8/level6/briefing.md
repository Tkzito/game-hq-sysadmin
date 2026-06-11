# Nível 76 — Filtrando Saídas com Pipe e Grep

## 🎮 Contexto do Freela
Você está investigando logs de instabilidade do servidor de banco de dados e controle de tráfego. O arquivo `/home/operator/servidor.log` está repleto de mensagens de status. Para diagnosticar a causa raiz rapidamente, você precisa enviar o conteúdo do arquivo para o filtro do `grep` usando um pipe (`|`) para separar apenas as linhas que contêm o termo `ERROR` e salvá-las no arquivo `/home/operator/erros_filtrados.txt`.

## 🛠️ Missão
Filtre apenas as linhas que contêm a palavra `ERROR` de `/home/operator/servidor.log` utilizando um pipe (`|`) conectando `cat` (ou similar) ao `grep`, e salve o resultado filtrado no arquivo `/home/operator/erros_filtrados.txt`.

## 📝 Comandos Úteis
*   `|` (pipe): Conecta a saída padrão do comando da esquerda diretamente à entrada padrão do comando da direita.
*   `grep 'TERMO'`: Filtra linhas contendo o termo fornecido.
*   `cat`: Exibe o conteúdo de um arquivo.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/erros_filtrados.txt` deve existir e conter apenas as 3 linhas de erro do log original (sem nenhuma linha do tipo INFO ou WARNING). A validação inspecionará o histórico de comandos para atestar o uso do operador pipe `|`.
