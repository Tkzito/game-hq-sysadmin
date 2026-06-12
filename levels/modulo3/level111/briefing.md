# Nível 111 — Processos em Execução: Quem Está Rodando Aqui?

## 🎮 Contexto do Freela
O servidor da OralTech trava periodicamente. O primeiro passo é entender o que está rodando nele. Sem esse diagnóstico, qualquer tentativa de correção é um tiro no escuro.

## 🛠️ Missão
Use o comando `ps aux` no terminal para analisar os processos em execução e identificar qual deles é o processo `radiologia_sync`.
O sistema validará se você executou a inspeção dos processos.

## 🎯 Comando-Chave
`ps aux`, `ps aux --sort=-%cpu | head -10`

## 🎯 Critério de Sucesso
* Executar o comando `ps aux` (ou similar) no terminal para inspecionar os processos.
