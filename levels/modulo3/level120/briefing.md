# Nível 120 — [DESAFIO INTEGRADO] O Servidor da Clínica

## 🎮 Contexto do Freela
07h45. Segunda-feira. O servidor principal da OralTech entra em colapso uma hora antes da abertura da clínica. O load average está nas alturas e o sistema de agendamento está inacessível. Renato te liga: *"Você tem 15 minutos antes dos dentistas chegarem e o caos se instalar."*

## 🛠️ Missão
Diagnostique e recupere o servidor seguindo as etapas em ordem lógica:

1. **CPU e Processo:** Identifique e encerre o processo `radiologia_sync` que está sobrecarregando a CPU. Use o sinal **SIGTERM (15)** para permitir que ele feche conexões abertas e grave o log de saída.
2. **Espaço em Disco:** Identifique qual partição está cheia. Vá até o diretório de logs correspondente e libere espaço removendo ou comprimindo os arquivos de logs antigos (`radiologia_sync.log.1` e `radiologia_sync.log.2`). **ATENÇÃO:** O arquivo de log atual (`radiologia_sync.log`) **não** pode ser removido por questões de auditoria da LGPD.
3. **Prioridade de Processo:** O processo de backup `/usr/local/bin/backup_dental.sh` está rodando com prioridade padrão e concorrendo com o servidor. Altere sua prioridade (niceness) para `19` usando `renice`.
4. **Restauração de Serviço:** Com o espaço em disco liberado e a CPU normalizada, inicie o serviço de agendamento usando `sudo systemctl start agendamento`.

## 🎯 Comando-Chave
`htop`, `df -h`, `free -h`, `kill -15 PID`, `renice`, `systemctl start agendamento`, `rm`, `gzip`

## 🎯 Critério de Sucesso
* Processo `radiologia_sync` finalizado corretamente via SIGTERM.
* Espaço em disco liberado em `/var` (deletando ou compactando `.log.1` e `.log.2`), mantendo o log atual `/var/log/radiologia_sync.log`.
* Prioridade do `backup_dental.sh` alterada para `19`.
* Serviço `agendamento` iniciado e respondendo.
