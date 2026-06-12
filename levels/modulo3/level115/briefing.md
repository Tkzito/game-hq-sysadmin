# Nível 115 — Uso de Disco por Partição: Mapeando o Território

## 🎮 Contexto do Freela
O servidor de radiografias tem partições separadas para `/`, `/var` e `/home`. O sistema de agendamento está falhando ao tentar criar arquivos temporários. Suspeita-se de disco cheio.

## 🛠️ Missão
Verifique o espaço em disco de cada partição montada usando o comando `df -h` no terminal.
O sistema validará se você executou a verificação de espaço em disco.

## 🎯 Comando-Chave
`df -h`, `df -hT`

## 🎯 Critério de Sucesso
* Executar o comando `df -h` (ou similar) no terminal para inspecionar o uso do disco.
