# Nível 118 — Rastreando Arquivos Abertos por Processo

## 🎮 Contexto do Freela
O processo de sincronização de radiografias está sendo executado novamente, mas agora você quer saber exatamente quais arquivos ele está acessando — suspeita-se que ele esteja lendo arquivos de pacientes que não deveria.

## 🛠️ Missão
Utilize `ps aux` para encontrar o PID do processo `radiologia_sync`.
Em seguida, use o comando `lsof -p PID` (ou comandos relacionados do lsof) para inspecionar todos os arquivos abertos por esse processo e descobrir qual arquivo do diretório `/var/data/pacientes/prontuarios/` ele mantém aberto.
O sistema validará se você executou a ferramenta `lsof`.

## 🎯 Comando-Chave
`lsof -p PID`, `lsof -u operator`, `ps aux | grep radiologia`

## 🎯 Critério de Sucesso
* Executar o comando `lsof` no terminal para inspecionar os arquivos abertos pelo processo.
