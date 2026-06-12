# Nível 113 — Enviando Sinais a Processos: A Arte de Encerrar com Elegância

## 🎮 Contexto do Freela
O processo `radiologia_sync` foi identificado como culpado. Mas encerrar processos de forma abrupta pode corromper arquivos de radiografia. Você precisa saber a diferença entre pedir educadamente e forçar o encerramento.

## 🛠️ Missão
Identifique os dois processos problemáticos que estão rodando no sistema: `radiologia_sync` e `radiologia_stuck`.
1. Finalize o processo `radiologia_sync` de forma limpa enviando um sinal `SIGTERM` (15). Ele está configurado para salvar seu estado antes de sair.
2. O processo `radiologia_stuck` está travado e ignora conexões e sinais normais. Finalize-o usando um sinal `SIGKILL` (9).

## 🎯 Comando-Chave
`kill -15 PID`, `kill -9 PID`, `ps aux | grep radiologia`

## 🎯 Critério de Sucesso
* O processo `radiologia_sync` deve ser finalizado com sucesso via `SIGTERM` (sinal 15).
* O processo `radiologia_stuck` deve ser finalizado com sucesso via `SIGKILL` (sinal 9).
