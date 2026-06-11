# Nível 80 — Redirecionando a Entrada Padrão (stdin) com '<'

## 🎮 Contexto do Freela
Você precisa gerar o arquivo de configuração definitivo de autenticação a partir de variáveis brutas. No seu diretório home, você possui o arquivo bruto `/home/operator/config_raw.txt` e um utilitário chamado `/home/operator/processador.sh`. Este script foi projetado para ler variáveis linha por linha através da **entrada padrão (stdin)**, formatá-las em caixa alta com o prefixo correto, e enviar o resultado para a saída padrão.

## 🛠️ Missão
Execute o utilitário `/home/operator/processador.sh` alimentando-o com o conteúdo de `/home/operator/config_raw.txt` usando o redirecionador de entrada `<`. Redirecione o resultado final do script para o arquivo `/home/operator/config_final.cfg` usando o redirecionador de saída `>`.
O comando deve ter a seguinte estrutura lógica:
`comando < entrada > saida`

## 📝 Comandos Úteis
*   `<`: Redireciona o conteúdo de um arquivo para a entrada padrão (stdin) de um comando.
*   `>`: Redireciona a saída padrão (stdout) para um arquivo.
*   `./processador.sh`: O script processador de dados.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/config_final.cfg` deve existir e conter as entradas de configuração processadas:
```text
CONF_HOSTNAME=AURAPORTAL
CONF_ENV=PROD
CONF_VERSION=7.0
```
A validação inspecionará seu histórico de comandos para atestar se você utilizou os redirecionadores de entrada `<` e saída `>` de forma conjunta.
