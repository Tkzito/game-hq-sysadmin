# Nível 119 — Prioridade de Execução: Quem Passa na Frente

## 🎮 Contexto do Freela
A OralTech tem dois serviços críticos: o sistema de agendamento (deve ter prioridade máxima) e o processo de backup (pode ser lento). Atualmente ambos concorrem igualmente pela CPU, degradando o agendamento.

## 🛠️ Missão
Localize o PID do processo `/usr/local/bin/backup_dental.sh` que já está rodando no sistema.
Altere a sua prioridade (niceness) para a menor prioridade possível, que é `+19`, utilizando o comando `renice`. Isso garante que ele só utilize ciclos de CPU que estiverem livres, sem atrapalhar outros serviços.

## 🎯 Comando-Chave
`renice -n 19 -p PID`, `ps -o pid,nice,cmd -p PID`

## 🎯 Critério de Sucesso
* Alterar o valor de nice do processo `/usr/local/bin/backup_dental.sh` em execução para `19`.
