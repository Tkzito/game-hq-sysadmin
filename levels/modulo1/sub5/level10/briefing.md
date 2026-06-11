# Nível 50 — O Orquestrador de Backups

## 🎮 Contexto do Freela
Chegou a hora de consolidar seus conhecimentos em argumentos de linha de comando. Você deve criar uma ferramenta de backup automatizada.

## 🛠️ Missão
Crie o script `/home/operator/backup_tool.sh` que aceita as seguintes opções obrigatórias via `getopts`:
- `-d <diretorio>`: O diretório a ser salvo. (Imprime `DIR=<diretorio>`)
- `-t <tipo>`: Tipo do arquivo, que deve ser obrigatoriamente `gzip` ou `zip`. (Imprime `TIPO=<tipo>`)
- `-v`: Opcional. Se fornecido, ativa o modo verboso. (Imprime `VERBOSO=SIM`)

Se a opção `-d` ou `-t` estiver ausente, ou se o tipo de compressão não for `gzip` ou `zip`, o script deve exibir `Erro na configuracao.` e sair com exit code `1`.

Exemplo: `./backup_tool.sh -d /var/log -t gzip -v` deve produzir:
`DIR=/var/log`
`TIPO=gzip`
`VERBOSO=SIM`

## 🎯 Critério de Sucesso
O script `/home/operator/backup_tool.sh` deve processar as chaves, validar a obrigatoriedade de `-d` e `-t`, verificar o valor correto de `-t` e retornar os códigos de saída adequados.
