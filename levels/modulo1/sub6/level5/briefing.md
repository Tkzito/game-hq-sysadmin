# Nível 55 — Alternância Avançada (grep -E)

## 🎮 Contexto do Freela
Para regexes mais avançadas que incluem alternância (operador `|` para "ou") ou quantificadores específicos, devemos usar o Grep com a flag de expressões regulares estendidas (`-E` ou o utilitário `egrep`).

## 🛠️ Missão
Filtre o arquivo `/home/operator/sistema.log` exibindo apenas as linhas que contenham o termo `CRITICAL` ou `FATAL` usando uma única expressão regular com alternância.

## 📝 Comandos Úteis
*   `grep -E "CRITICAL|FATAL" arquivo`: Utiliza regex estendida para casar um padrão OU outro.

## 🎯 Critério de Sucesso
O histórico deve registrar o uso do comando `grep -E` (ou `egrep`) com a alternância correta.
