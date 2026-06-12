# Nível 137 — Agendamento de Tarefas com Cron

## 🎮 Contexto do Freela
Nossos scripts de monitoramento e backup estão prontos, mas precisam rodar de forma contínua e automatizada. Vamos configurar o `crontab` do usuário `operator` para executar essas rotinas nos horários corretos.

## 🛠️ Missão
Configure o crontab do usuário `operator` para agendar os scripts de acordo com os seguintes requisitos:
1. Agende o script `/opt/freshbox/healthcheck.sh` para rodar **a cada 5 minutos**.
2. Agende o script `/opt/freshbox/backup.sh` para rodar **todo dia às 2h30 da manhã**.
3. Use o comando `crontab -e` para editar o agendamento. (Dica: garanta que está editando como o usuário correto!).

## 💡 Dicas e Exemplo de Estrutura
A sintaxe do cron possui 5 campos de tempo:
`minuto hora dia-do-mês mês dia-da-semana comando`

Exemplos de sintaxe:
* A cada 5 minutos: `*/5 * * * * /caminho/do/script.sh`
* Às 2h30 da manhã diariamente: `30 2 * * * /caminho/do/script.sh`

Você pode listar o agendamento atual com `crontab -l` para verificar seu trabalho.

## 🎯 Critério de Sucesso
* O crontab do usuário `operator` deve ter as duas entradas ativas.
* A entrada de `healthcheck.sh` deve conter o intervalo de a cada 5 minutos (`*/5 * * * *`).
* A entrada de `backup.sh` deve conter o horário de 2h30 da manhã (`30 2 * * *`).
