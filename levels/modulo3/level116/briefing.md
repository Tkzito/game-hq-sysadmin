# Nível 116 — Identificando os Maiores Consumidores de Espaço

## 🎮 Contexto do Freela
O disco está quase cheio mas a pasta `/var/log` tem diversos arquivos. Identificar manualmente qual pasta está gigante é impraticável. Precisamos de um método sistemático para afunilar o problema.

## 🛠️ Missão
Analise o uso de espaço em disco no diretório `/var/log/` usando os comandos `du` e `sort`.
Identifique qual arquivo dentro de `/var/log/` está consumindo a maior quantidade de espaço.
O sistema validará se você executou a verificação de espaço do diretório.

## 🎯 Comando-Chave
`du -sh *`, `du -ah /var/log | sort -rh | head -10`

## 🎯 Critério de Sucesso
* Executar o comando `du` (ou similar) apontando para o diretório `/var/log` no terminal.
