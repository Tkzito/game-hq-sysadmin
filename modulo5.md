# MÓDULO 5: Automação e Shell Scripting Avançado
## Guia de Níveis (131 a 140) — Foco: DevOps Jr em Startup de Alto Crescimento

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

**Cidade: Nova Recife, 2047.**

Seu portfólio de atendimentos chamou a atenção de Larissa, CTO da **FreshBox** — uma startup de delivery de comida saudável que cresceu 400% em 6 meses e agora entrega em 12 cidades do Nordeste.

O problema: a infra não acompanhou o crescimento. O time de infra tem 2 pessoas. Os processos são todos manuais:
- Verificar manualmente 3 servidores toda manhã
- Limpar logs de produção toda semana
- Reiniciar serviços após falha às 3h da manhã
- Enviar e-mails de status manualmente

Larissa é direta: *"Você vai ser nosso DevOps Jr. Seu trabalho não é só manter os servidores funcionando — é fazer com que eles se mantenham sozinhos enquanto a gente dorme."*

AURA-7 processa o briefing:
*"Automação é o que diferencia um administrador de sistemas de um vigia de plantão. Um bom script de bash, bem escrito, pode substituir 4 horas de trabalho manual diário. A diferença entre um SysAdmin e um DevOps começa exatamente aqui: na capacidade de ensinar a máquina a trabalhar por você."*

Você abre o editor. É hora de escrever código que trabalha enquanto você dorme.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

---

#### Nível 131 — Loops em Lista Estática: A Primeira Repetição

- **Contexto:** A FreshBox tem servidores com nomes fixos: `app01`, `app02`, `app03`. Toda manhã, alguém precisa verificar o disco em cada um. A tarefa é idêntica — só muda o nome do servidor. Loop resolve.
- **Missão:** Criar um script usando `for item in lista` para iterar sobre uma lista estática de servidores, executando o mesmo comando em cada um. Entender a estrutura completa do loop for.
- **Comando-Chave:** `for server in app01 app02 app03; do ssh $server "df -h"; done`
- **Exemplo de Script:**
  ```bash
  #!/usr/bin/env bash
  SERVERS="app01 app02 app03"

  for server in $SERVERS; do
      echo "=== Verificando: $server ==="
      ssh deploy@$server "df -h / | tail -1"
  done
  ```
- **Conceitos Abordados:**
  - Estrutura `for var in lista; do ... done`
  - Variáveis em bash: declaração e uso com `$VAR`
  - Aspas duplas vs aspas simples: quando usar cada uma
  - Shebang `#!/usr/bin/env bash` e por que usar `env bash`
  - Tornar script executável: `chmod +x script.sh`
  - Boas práticas: `set -e` (falha se qualquer comando falhar) e `set -u` (erro em variável não definida)
  - Variáveis especiais: `$0` (nome do script), `$1` (primeiro argumento), `$#` (número de argumentos)
- **Diálogo AURA-7:** *"Um loop que roda em 3 servidores em 2 segundos substitui 6 minutos de verificação manual. Em escala: se isso roda 5 vezes por dia, são 30 minutos economizados diariamente — 182 horas por ano. Automação não é conveniência. É retorno sobre investimento."*

---

#### Nível 132 — Loops em Arquivos e Saída de Comandos

- **Contexto:** A FreshBox tem dezenas de arquivos de log que precisam ser comprimidos diariamente. A lista de arquivos muda todo dia. Um loop estático não funciona — precisamos iterar sobre a saída de um comando.
- **Missão:** Usar `for f in $(comando)` para iterar sobre a saída de comandos, processar arquivos em diretório e usar expansão de glob do shell.
- **Comando-Chave:** `for f in $(find /var/log/freshbox -name "*.log" -mtime +1); do gzip $f; done`
- **Exemplo de Script:**
  ```bash
  #!/usr/bin/env bash
  LOG_DIR="/var/log/freshbox"

  # Iterar sobre arquivos com mais de 1 dia
  for log_file in $(find "$LOG_DIR" -name "*.log" -mtime +1); do
      echo "Comprimindo: $log_file"
      gzip "$log_file" && echo "OK: ${log_file}.gz"
  done

  # Alternativa com glob
  for log_file in /var/log/freshbox/*.log; do
      [ -f "$log_file" ] || continue
      echo "Processando: $log_file"
  done
  ```
- **Conceitos Abordados:**
  - Substituição de comando: `$(comando)` vs backticks `` `comando` ``
  - Globbing: `*.log`, `app[0-9].txt`, `{app,db}*.log`
  - IFS (Internal Field Separator): como o shell divide tokens
  - Por que `for f in $(ls)` é perigoso com espaços nos nomes (use glob em vez disso)
  - `find` básico: `-name`, `-mtime`, `-type f/d`, `-size`
  - `continue` e `break` dentro de loops
  - Boas práticas: sempre colocar variáveis de caminho entre aspas duplas
- **Diálogo AURA-7:** *"Atenção ao `for f in $(ls)` — se algum arquivo tiver espaço no nome, o loop vai quebrar o nome em múltiplos tokens e falhar. Prefira sempre `for f in /diretorio/*.ext` ou `find ... | while read -r f`. No mundo de produção, 'edge cases' como nomes com espaço aparecem na pior hora possível."*

---

#### Nível 133 — Loops Condicionais: Esperando que Algo Aconteça

- **Contexto:** Um deploy da FreshBox demora entre 30 segundos e 5 minutos para o serviço ficar disponível. O script de CI precisa esperar o serviço responder antes de continuar os testes, sem travar o pipeline indefinidamente.
- **Missão:** Usar `while` e `until` para criar loops que aguardam condições — verificar se um arquivo existe, se um serviço responde ou se um contador atinge limite.
- **Exemplo de Script:**
  ```bash
  #!/usr/bin/env bash
  MAX_WAIT=60
  ELAPSED=0
  SERVICE_URL="http://app01.freshbox.internal/health"

  echo "Aguardando serviço disponível..."

  until curl -sf "$SERVICE_URL" > /dev/null 2>&1; do
      if [ "$ELAPSED" -ge "$MAX_WAIT" ]; then
          echo "ERRO: Timeout após ${MAX_WAIT}s. Serviço não disponível."
          exit 1
      fi
      echo "Tentativa ${ELAPSED}s — aguardando..."
      sleep 5
      ELAPSED=$((ELAPSED + 5))
  done

  echo "Serviço disponível após ${ELAPSED}s!"
  ```
- **Conceitos Abordados:**
  - `while condição; do ... done`: executa enquanto condição é verdadeira
  - `until condição; do ... done`: executa até condição ser verdadeira (oposto do while)
  - `while true; do ... done`: loop infinito controlado por `break`
  - Operações aritméticas: `$((expressão))`
  - `sleep N`: pausa N segundos
  - Verificação de timeout: evitar loops infinitos em produção
  - `curl -sf`: `-s` (silent), `-f` (fail on HTTP error) — retorna exit code não-zero em falha
  - `> /dev/null 2>&1`: descartar stdout e stderr
- **Diálogo AURA-7:** *"Um `while true` sem condição de saída é uma bomba-relógio. Em produção, sempre adicione timeout máximo. Já vi pipelines de CI trancados por horas esperando um serviço que nunca iria subir — consumindo crédito de cloud sem fazer nada. Timeout não é pessimismo, é engenharia."*

---

#### Nível 134 — Condicionais Avançadas: Verificando o Mundo ao Redor

- **Contexto:** O script de backup da FreshBox precisa verificar se o diretório de destino existe antes de começar, se o arquivo de configuração está presente e se o link simbólico está apontando para o lugar correto.
- **Missão:** Usar flags de teste do bash (`-f`, `-d`, `-L`, `-z`, `-n`, `-r`, `-w`, `-x`) para verificar a existência e propriedades de arquivos, diretórios e variáveis antes de operar sobre eles.
- **Exemplo de Script:**
  ```bash
  #!/usr/bin/env bash
  CONFIG="/etc/freshbox/backup.conf"
  BACKUP_DIR="/mnt/backup"
  CURRENT_LINK="/var/freshbox/current"

  # Verificar arquivo de configuração
  if [ ! -f "$CONFIG" ]; then
      echo "ERRO: Arquivo de configuração não encontrado: $CONFIG"
      exit 1
  fi

  # Verificar diretório de backup
  if [ ! -d "$BACKUP_DIR" ]; then
      echo "Criando diretório de backup..."
      mkdir -p "$BACKUP_DIR"
  fi

  # Verificar link simbólico
  if [ -L "$CURRENT_LINK" ]; then
      echo "Link atual aponta para: $(readlink -f $CURRENT_LINK)"
  fi

  # Verificar permissão de escrita
  if [ ! -w "$BACKUP_DIR" ]; then
      echo "ERRO: Sem permissão de escrita em $BACKUP_DIR"
      exit 1
  fi
  ```
- **Conceitos Abordados:**
  - `-f`: é um arquivo regular? (não diretório, não link)
  - `-d`: é um diretório?
  - `-L`: é um link simbólico?
  - `-e`: existe (qualquer tipo)?
  - `-r`, `-w`, `-x`: tem permissão de leitura, escrita, execução?
  - `-z "$VAR"`: variável está vazia?
  - `-n "$VAR"`: variável tem conteúdo?
  - Comparação numérica: `-eq`, `-ne`, `-lt`, `-gt`, `-le`, `-ge`
  - Comparação de strings: `=`, `!=`, `<`, `>`
  - `[[ ]]` vs `[ ]`: double brackets são mais seguros e suportam regex
- **Diálogo AURA-7:** *"Verificação defensiva não é paranoia — é profissionalismo. Um script que assume que o diretório existe vai falhar silenciosamente e possivelmente corromper dados. Um script que verifica antes falha de forma controlada com mensagem clara. Qual comportamento você prefere descobrir às 3h da manhã?"*

---

#### Nível 135 — Funções Modulares Reutilizáveis

- **Contexto:** Os scripts da FreshBox estão ficando grandes e com código duplicado. O mesmo bloco de verificação de saúde aparece em 5 scripts diferentes. Mudança em um lugar exige mudança em todos. Hora de refatorar com funções.
- **Missão:** Criar funções bash reutilizáveis com parâmetros, valores de retorno via exit code e output capturável. Organizar um script em módulos lógicos.
- **Exemplo de Script:**
  ```bash
  #!/usr/bin/env bash
  set -euo pipefail

  # === FUNÇÕES ===

  log() {
      local level="$1"
      local message="$2"
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $message"
  }

  check_service() {
      local url="$1"
      local timeout="${2:-5}"

      if curl -sf --max-time "$timeout" "$url" > /dev/null 2>&1; then
          return 0  # sucesso
      else
          return 1  # falha
      fi
  }

  notify_failure() {
      local service="$1"
      log "ERROR" "Serviço OFFLINE: $service"
      echo "$service" >> /var/log/freshbox/failures.log
  }

  # === MAIN ===

  SERVICES=("http://app01/health" "http://app02/health" "http://db01:5432")

  for service in "${SERVICES[@]}"; do
      if check_service "$service"; then
          log "INFO" "OK: $service"
      else
          notify_failure "$service"
      fi
  done
  ```
- **Conceitos Abordados:**
  - Declaração de função: `nome_funcao() { ... }` ou `function nome_funcao { ... }`
  - Parâmetros dentro da função: `$1`, `$2`, `${N:-default}`
  - `local`: variável local ao escopo da função (não vaza para fora)
  - `return N`: define exit code da função (0=sucesso, 1+=erro)
  - Capturar saída de função: `resultado=$(minha_funcao arg)`
  - `set -euo pipefail`: trio de segurança — exit on error, unbound var, pipe failure
  - Organização: funções primeiro, depois main; separadores visuais; comentários
  - Libraries: fonte de funções com `source ./lib/functions.sh` ou `. ./lib/functions.sh`
- **Diálogo AURA-7:** *"Um script de 300 linhas sem funções é um pesadelo de manutenção. Com funções bem nomeadas, você lê `check_service` e sabe o que faz sem precisar entender a implementação. Isso se chama abstração — o mesmo princípio que torna código em qualquer linguagem sustentável."*

---

#### Nível 136 — Arrays em Bash: Listas com Superpoderes

- **Contexto:** O script de verificação de saúde da FreshBox precisa gerenciar dinamicamente a lista de endpoints, acumular falhas e processar a lista de serviços críticos separadamente dos não-críticos.
- **Missão:** Declarar e usar arrays bash — iterar com `for`, acessar por índice, adicionar elementos, verificar tamanho e usar arrays associativos (dicionários).
- **Exemplo de Script:**
  ```bash
  #!/usr/bin/env bash

  # Arrays indexados
  CRITICAL_SERVICES=("app01" "app02" "db01")
  OPTIONAL_SERVICES=("monitoring" "analytics")

  # Acessar por índice
  echo "Primeiro serviço crítico: ${CRITICAL_SERVICES[0]}"

  # Tamanho do array
  echo "Total de serviços críticos: ${#CRITICAL_SERVICES[@]}"

  # Adicionar elemento
  CRITICAL_SERVICES+=("auth-service")

  # Iterar corretamente
  for service in "${CRITICAL_SERVICES[@]}"; do
      echo "Verificando: $service"
  done

  # Array associativo (dicionário)
  declare -A SERVICE_PORTS
  SERVICE_PORTS["app01"]=8080
  SERVICE_PORTS["db01"]=5432
  SERVICE_PORTS["auth"]=3000

  for service in "${!SERVICE_PORTS[@]}"; do
      echo "$service está na porta ${SERVICE_PORTS[$service]}"
  done

  # Acumular falhas
  FAILURES=()
  for service in "${CRITICAL_SERVICES[@]}"; do
      # simular verificação
      FAILURES+=("$service")
  done
  echo "Total de falhas: ${#FAILURES[@]}"
  ```
- **Conceitos Abordados:**
  - Declaração: `ARRAY=(item1 item2)` e `declare -a ARRAY`
  - Acesso: `${ARRAY[0]}`, `${ARRAY[-1]}` (último), `${ARRAY[@]}` (todos)
  - Tamanho: `${#ARRAY[@]}`
  - Adicionar: `ARRAY+=("novo")` ou `ARRAY[N]="valor"`
  - Fatia: `${ARRAY[@]:inicio:tamanho}`
  - Arrays associativos: `declare -A DICT; DICT["chave"]="valor"`
  - Iteração de chaves: `${!DICT[@]}`
  - Por que `"${ARRAY[@]}"` (aspas) é essencial — sem aspas, espaços quebram a iteração
- **Diálogo AURA-7:** *"Arrays associativos transformam bash em algo próximo de Python para scripts de configuração. O mapeamento `SERVICE_PORTS` que você criou seria 10 variáveis separadas sem arrays — impossível de iterar. Essa é a diferença entre um script de 50 linhas e um de 500."*

---

#### Nível 137 — Agendamento de Tarefas com Cron

- **Contexto:** Os scripts de verificação de saúde estão prontos, mas ainda precisam ser rodados manualmente. A FreshBox precisa que eles executem automaticamente — toda hora, todo dia, toda semana — sem intervenção humana.
- **Missão:** Configurar o `crontab -e` para agendar scripts em horários específicos. Dominar a sintaxe de 5 campos da expressão cron e entender os casos especiais.
- **Comando-Chave:** `crontab -e`, `crontab -l`, `crontab -r`, `crontab -u usuario -e`
- **Exemplos de Expressões Cron:**
  ```
  # minuto hora dia-do-mês mês dia-da-semana comando
  
  # A cada 5 minutos
  */5 * * * * /opt/freshbox/healthcheck.sh
  
  # Todo dia às 2h30 da manhã
  30 2 * * * /opt/freshbox/backup.sh
  
  # Segunda a sexta, às 8h e 18h
  0 8,18 * * 1-5 /opt/freshbox/report.sh
  
  # No primeiro dia de cada mês
  0 0 1 * * /opt/freshbox/monthly_cleanup.sh
  
  # Apenas domingos às 23h59
  59 23 * * 0 /opt/freshbox/weekly_archive.sh
  ```
- **Conceitos Abordados:**
  - Os 5 campos: minuto (0-59), hora (0-23), dia-do-mês (1-31), mês (1-12), dia-da-semana (0-7)
  - `*` = qualquer valor; `/N` = a cada N; `,` = lista; `-` = intervalo
  - Aliases: `@hourly`, `@daily`, `@weekly`, `@monthly`, `@reboot`
  - Variáveis no crontab: `SHELL`, `PATH`, `MAILTO`
  - `MAILTO=""`: silenciar emails de saída (por padrão, cron envia e-mail local com output)
  - Armadilha comum: PATH do cron é mínimo — sempre use caminhos absolutos nos scripts
  - `/etc/cron.d/`: arquivos de cron com usuário especificado (para serviços do sistema)
  - `/etc/cron.daily/`, `/etc/cron.weekly/`: diretórios de scripts periódicos
- **Diálogo AURA-7:** *"A armadilha mais comum com cron é o PATH. Quando você roda um comando no terminal, tem `/usr/local/bin` no PATH. O cron não. Se seu script chama `python3` sem caminho absoluto, vai falhar silenciosamente às 2h da manhã. Sempre use `/usr/bin/python3` ou adicione `PATH=/usr/local/bin:$PATH` no topo do crontab."*

---

#### Nível 138 — Logs Automáticos: Registrando o que Aconteceu

- **Contexto:** Os scripts da FreshBox estão rodando no cron, mas quando algo falha às 3h da manhã, ninguém sabe o que aconteceu. Precisamos de logs automáticos com timestamp, rotação e separação por data.
- **Missão:** Implementar redirecionamento de saída no crontab e dentro dos scripts, adicionar timestamps em todas as mensagens e configurar rotação de logs com `logrotate`.
- **Comando-Chave:** Redirecionamentos no crontab e script; `logrotate -d /etc/logrotate.d/freshbox`
- **Exemplo de Script com Log:**
  ```bash
  #!/usr/bin/env bash
  LOG_FILE="/var/log/freshbox/healthcheck-$(date +%Y-%m-%d).log"

  log() {
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
  }

  log "INFO" "=== Início da verificação ==="
  log "INFO" "Servidor: $(hostname)"
  
  # O crontab redireciona erros também:
  # */5 * * * * /opt/freshbox/healthcheck.sh >> /var/log/freshbox/cron.log 2>&1
  ```
- **Exemplo de logrotate:**
  ```
  /var/log/freshbox/*.log {
      daily
      rotate 30
      compress
      delaycompress
      missingok
      notifempty
      create 0644 deploy deploy
  }
  ```
- **Conceitos Abordados:**
  - `>>`: append (adiciona ao arquivo existente) vs `>` (sobrescreve)
  - `2>&1`: redirecionar stderr para stdout (capturar erros também)
  - `tee`: escreve no arquivo E na tela ao mesmo tempo
  - `date +%Y-%m-%d`: formato de data para nomes de arquivo
  - Rotação de logs com `logrotate`: `daily`, `rotate N`, `compress`, `missingok`
  - `logger`: escrever no syslog do sistema (`/var/log/syslog`)
  - Log levels: INFO, WARN, ERROR, CRITICAL — convenção de nomenclatura
  - Por que log por data é melhor que um único log gigante
- **Diálogo AURA-7:** *"Um sistema sem logs é um sistema que opera na escuridão. Quando tudo está funcionando, logs parecem desperdício de disco. Quando algo falha às 3h, logs são a diferença entre resolver em 10 minutos ou passar a noite sem dormir. Sempre log. Sempre timestamp."*

---

#### Nível 139 — Healthcheck com Restart Automático

- **Contexto:** O serviço principal da FreshBox cai com frequência por memory leak. O time de desenvolvimento ainda está corrigindo o bug, mas enquanto isso, precisamos detectar a queda automaticamente e reiniciar o serviço antes que o cliente perceba.
- **Missão:** Criar um script completo de healthcheck que verifica um endpoint HTTP, detecta falha, tenta reiniciar o serviço e registra tudo em log. O script deve ser agendado no cron a cada 5 minutos.
- **Exemplo de Script Completo:**
  ```bash
  #!/usr/bin/env bash
  set -euo pipefail

  SERVICE_NAME="freshbox-api"
  HEALTH_URL="http://localhost:8080/health"
  LOG_FILE="/var/log/freshbox/healthcheck.log"
  MAX_RETRIES=3

  log() {
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$1] $2" >> "$LOG_FILE"
  }

  check_health() {
      curl -sf --max-time 5 "$HEALTH_URL" > /dev/null 2>&1
      return $?
  }

  restart_service() {
      log "WARN" "Reiniciando $SERVICE_NAME..."
      if systemctl restart "$SERVICE_NAME"; then
          log "INFO" "Reinício bem-sucedido"
          return 0
      else
          log "ERROR" "Falha ao reiniciar $SERVICE_NAME"
          return 1
      fi
  }

  # Main
  log "INFO" "Verificando saúde do serviço..."

  if check_health; then
      log "INFO" "OK — $SERVICE_NAME respondendo normalmente"
      exit 0
  fi

  log "WARN" "Serviço não responde. Tentando restart..."

  for attempt in $(seq 1 $MAX_RETRIES); do
      log "INFO" "Tentativa $attempt de $MAX_RETRIES"
      restart_service && sleep 10 && check_health && {
          log "INFO" "Recuperado na tentativa $attempt"
          exit 0
      }
  done

  log "ERROR" "CRÍTICO: $SERVICE_NAME não recuperou após $MAX_RETRIES tentativas"
  echo "ALERT: $SERVICE_NAME OFFLINE $(date)" >> /var/log/freshbox/alerts.log
  exit 1
  ```
- **Conceitos Abordados:**
  - `systemctl restart SERVIÇO`: reiniciar serviço systemd
  - `systemctl is-active SERVIÇO`: verificar se serviço está ativo (exit 0 = ativo)
  - Exit codes: convenção de 0=sucesso, 1+=erro
  - Retry com contador e limite máximo
  - `sleep N` entre tentativas para dar tempo ao serviço subir
  - Arquivo de sinalização (signal file) para alertas: `echo "ALERT" >> alerts.log`
  - Idempotência: o script pode ser chamado várias vezes sem efeito colateral
- **Diálogo AURA-7:** *"Este script é o embrião de um sistema de auto-recuperação. Sistemas modernos de alta disponibilidade fazem exatamente isso em escala — Kubernetes, por exemplo, faz healthcheck e restart automático de containers. Você está aprendendo o princípio fundamental que escala de um script bash para uma plataforma de orquestração global."*

---

#### Nível 140 — [DESAFIO INTEGRADO] O Automatizador do FreshBox

- **Contexto:** É segunda-feira de manhã. Larissa apresenta os números do fim de semana: 3 incidentes, 2 notificados por clientes antes da equipe perceber, e 4 horas de trabalho manual de monitoramento no sábado. Ela é direta: *"Você tem até sexta-feira para automatizar tudo isso. Quando eu chegar segunda que vem, quero que o sistema já tenha resolvido sozinho qualquer problema que acontecer."*
- **Missão:** Criar um sistema de automação completo que integre todos os conceitos do módulo. O jogador deve entregar um script que:
  1. **Verifique** a saúde de 3 endpoints da FreshBox usando array de URLs
  2. **Registre** cada verificação em log com timestamp preciso
  3. **Implemente** retry automático de até 3 tentativas após falha (com `while`)
  4. **Acumule** falhas consecutivas em arquivo de estado (`/tmp/freshbox_failures`)
  5. **Emita** alerta (arquivo de sinalização) quando o mesmo serviço falhar 2 vezes seguidas
  6. **Reinicie** o serviço automaticamente na terceira falha consecutiva
  7. **Limpe** o contador de falhas quando o serviço se recuperar
  8. **Agende** a execução a cada 5 minutos via crontab
  9. **Configure** rotação de logs para 30 dias
- **Estrutura Esperada:**
  ```bash
  #!/usr/bin/env bash
  # freshbox-monitor.sh
  # Arquivo de estado: /tmp/freshbox_state/SERVICE_failures
  # Log: /var/log/freshbox/monitor-YYYY-MM-DD.log
  # Alert: /var/log/freshbox/alerts.log
  ```
- **Critério de Vitória:**
  - Script executa sem erros (`bash -n` passa sem warnings)
  - Healthcheck detecta falha simulada corretamente
  - Arquivo de estado incrementa a cada falha consecutiva
  - Alerta é gerado após 2 falhas seguidas
  - Restart ocorre após 3 falhas seguidas
  - Estado reseta após recuperação
  - Crontab configurado corretamente (verificado com `crontab -l`)
  - Logrotate configurado para o log do script
- **Diálogo AURA-7:** *"Sistema de monitoramento ativo. Primeira execução completa sem erros. Estado dos 3 serviços: verde. Próxima verificação em 5 minutos, automática, sem intervenção humana. Larissa pode dormir tranquila no fim de semana. Você acabou de construir o primeiro módulo de auto-recuperação da FreshBox."*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Conceito Central | Dificuldade |
|:------|:-------|:-----------------|:-----------|
| 131 | Loops em Lista Estática | `for in` | ⭐⭐ |
| 132 | Loops em Arquivos e Saída | `$(comando)`, glob | ⭐⭐⭐ |
| 133 | Loops Condicionais | `while`, `until` | ⭐⭐⭐ |
| 134 | Condicionais Avançadas | `-f`, `-d`, `-L` | ⭐⭐⭐ |
| 135 | Funções Modulares | `function()` | ⭐⭐⭐⭐ |
| 136 | Arrays em Bash | Arrays e dicionários | ⭐⭐⭐⭐ |
| 137 | Agendamento com Cron | `crontab` | ⭐⭐⭐ |
| 138 | Logs Automáticos | Redirecionamento, logrotate | ⭐⭐⭐ |
| 139 | Healthcheck com Restart | Script de auto-recuperação | ⭐⭐⭐⭐ |
| 140 | [Desafio] O Automatizador | Todos | ⭐⭐⭐⭐⭐ |

**XP Total do Módulo:** 3.000 XP  
**Título Desbloqueado:** 🤖 *"O Arquiteto da Automação"*  
**Próximo Módulo:** Módulo 6 — Versionamento e Pipeline CI/CD
