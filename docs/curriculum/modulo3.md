# MÓDULO 3: Monitoramento de Processos e Recursos
## Guia de Níveis (111 a 120) — Foco: SysAdmin Júnior em Ambiente Clínico

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

**Cidade: Nova Recife, 2047.**

Você acabou de ser contratado como SysAdmin Júnior pela **Clínica OralTech** — uma rede de clínicas odontológicas que atende convênios corporativos e está em plena migração dos seus servidores Windows Server 2012 legados para Ubuntu Server 22.04.

A recepcionista Dona Francisca te recebe com um olhar cansado:
*"Esses computadores travam toda hora. O sistema de agendamento de pacientes fica horas sem responder, o servidor de radiografias demora eternidades pra carregar imagem... os dentistas ficam parados esperando. A gente tá perdendo paciente, moço."*

Seu chefe, o gestor de TI Renato, abre o terminal e aponta:
*"Você vai descobrir o que tá pesando nesse servidor. Começa do básico — vê o que tá rodando, o que tá consumindo recursos, e a gente vai afunilando até achar o problema."*

AURA-7, sua IA parceira, pisca na interface holográfica:
*"Diagnóstico iniciado. O servidor apresenta load average de 4.82 em hardware de 2 núcleos. Isso é... perturbador. Vamos resolver isso juntos."*

---

## 🛠️ CAPÍTULOS (NÍVEIS)

---

#### Nível 111 — Processos em Execução: Quem Está Rodando Aqui?

- **Contexto:** O servidor da OralTech trava periodicamente. O primeiro passo é entender o que está rodando nele. Sem esse diagnóstico, qualquer tentativa de correção é um tiro no escuro.
- **Missão:** Executar `ps aux` e interpretar as colunas da saída — identificar os processos com maior consumo de CPU e memória, listar o usuário dono de cada processo e entender o significado de PID, USER, CPU%, MEM%, VSZ, RSS, TTY, STAT.
- **Comando-Chave:** `ps aux`, `ps aux --sort=-%cpu | head -10`, `ps aux --sort=-%mem | head -10`
- **Conceitos Abordados:**
  - `PID` — Process ID, identificador único do processo
  - `USER` — usuário dono do processo
  - `%CPU` — percentual de CPU consumido
  - `%MEM` — percentual de RAM consumida
  - `VSZ` — memória virtual alocada (KB)
  - `RSS` — memória física residente (KB)
  - `STAT` — estado do processo (S=sleeping, R=running, Z=zombie, D=uninterruptible)
  - `TIME` — tempo total de CPU consumido
- **Diálogo AURA-7:** *"Vejo aqui um processo chamado 'radiologia_sync' com 312% de CPU. Tecnicamente impossível em um núcleo, mas o kernel está fazendo malabarismo. Esse processo é o nosso principal suspeito, mas vamos coletar mais dados antes de agir."*

---

#### Nível 112 — Monitoramento Interativo com htop

- **Contexto:** O `ps aux` dá uma fotografia do momento, mas o servidor da OralTech apresenta picos intermitentes. Precisamos de uma visão em tempo real que atualize continuamente.
- **Missão:** Instalar e utilizar o `htop` para monitorar processos em tempo real. Navegar pela interface, ordenar por CPU e memória com as teclas F6, identificar o load average e entender o que significa cada barra colorida (CPU, Mem, Swp).
- **Comando-Chave:** `htop`, `htop -u www-data`, `htop -p PID`
- **Conceitos Abordados:**
  - Interface interativa do htop e navegação por teclado
  - Load Average: média de carga nos últimos 1, 5 e 15 minutos
  - Interpretação do load average em relação ao número de núcleos
  - Barras de CPU (verde=normal, vermelho=kernel, azul=nice)
  - Barras de memória (verde=usado, azul=buffer, amarelo=cache)
  - Swap em uso como indicador de pressão de memória
  - Teclas: F3 (busca), F6 (ordenar), F9 (kill), F10 (sair)
- **Diálogo AURA-7:** *"Um load average de 4.82 em 2 núcleos significa que o sistema tem mais que o dobro de processos disputando CPU do que consegue atender. É como uma fila de dentistas com quatro pacientes na cadeira e apenas duas cadeiras disponíveis — alguém sempre vai esperar demais."*

---

#### Nível 113 — Enviando Sinais a Processos: A Arte de Encerrar com Elegância

- **Contexto:** O processo `radiologia_sync` foi identificado como culpado. Mas encerrar processos de forma abrupta pode corromper arquivos de radiografia. Você precisa saber a diferença entre pedir educadamente e forçar o encerramento.
- **Missão:** Aprender a diferença entre `SIGTERM` (15) e `SIGKILL` (9). Praticar o envio de sinais com `kill` e `killall`. Entender quando usar cada um e por quê processos mal-escritos ignoram SIGTERM.
- **Comando-Chave:** `kill -15 PID`, `kill -9 PID`, `kill -SIGTERM PID`, `killall nome_do_processo`, `pkill -u usuario`
- **Conceitos Abordados:**
  - SIGTERM (15): "Por favor, encerre-se de forma limpa" — pode ser ignorado
  - SIGKILL (9): "Encerramento imediato pelo kernel" — não pode ser ignorado
  - SIGHUP (1): recarregar configuração sem reiniciar
  - SIGSTOP (19) e SIGCONT (18): pausar e continuar processo
  - Diferença entre `kill` (por PID) e `killall` (por nome) e `pkill` (por padrão)
  - Por que sempre tentar SIGTERM antes do SIGKILL
  - Processos zumbi (Z): já terminaram mas o pai não coletou o exit status
- **Diálogo AURA-7:** *"Pense no SIGTERM como uma notificação de demissão com aviso prévio — o processo tem tempo de salvar o trabalho e fechar conexões. O SIGKILL é como cortar a energia elétrica do servidor. Eficaz, mas pode deixar arquivos corrompidos. Use com sabedoria."*

---

#### Nível 114 — Verificando Consumo de Memória: O que a RAM Esconde

- **Contexto:** Após encerrar o processo problemático, o servidor ainda responde lento. Suspeita-se que a memória RAM está esgotada e o sistema passou a usar swap intensamente, o que degrada brutalmente a performance.
- **Missão:** Usar `free -h` para analisar a memória física e swap. Entender a diferença entre memória `used`, `free`, `shared`, `buff/cache` e `available`. Calcular quando o swap começa a ser usado e identificar pressão de memória.
- **Comando-Chave:** `free -h`, `free -m`, `free -s 2` (atualizar a cada 2 segundos), `cat /proc/meminfo`
- **Conceitos Abordados:**
  - Memória `total`: RAM física instalada
  - Memória `used`: em uso por processos
  - Memória `free`: completamente livre (geralmente pequena — normal no Linux)
  - Memória `buff/cache`: usada pelo kernel para cache de disco (pode ser liberada)
  - Memória `available`: estimativa real do que pode ser alocada por novos processos
  - Swap: extensão virtual da RAM no disco — muito mais lenta
  - Thrashing: quando o sistema passa mais tempo trocando swap do que executando código
- **Diálogo AURA-7:** *"No Linux, memória 'free' alta é memória desperdiçada — o kernel usa o que sobra como cache de disco para acelerar leituras. O número que importa é 'available'. Se ele cair abaixo de 10% da RAM total, é hora de investigar o que está consumindo tudo."*

---

#### Nível 115 — Uso de Disco por Partição: Mapeando o Território

- **Contexto:** O servidor de radiografias tem partições separadas para `/`, `/var` e `/home`. O sistema de agendamento está falhando ao tentar criar arquivos temporários. Suspeita-se de disco cheio.
- **Missão:** Usar `df -h` para verificar o percentual de uso de cada partição montada. Identificar qual partição está próxima de 100% e entender as implicações de um sistema de arquivos cheio para serviços críticos.
- **Comando-Chave:** `df -h`, `df -hT` (incluir tipo do FS), `df -i` (inodes)
- **Conceitos Abordados:**
  - Filesystem: sistema de arquivos e pontos de montagem
  - `Filesystem`: dispositivo ou volume lógico
  - `Size`, `Used`, `Avail`: tamanho total, usado e disponível
  - `Use%`: percentual de uso — acima de 90% é crítico
  - `Mounted on`: ponto de montagem no sistema de arquivos
  - Inodes: unidades de metadados — um disco pode ter espaço livre mas inodes esgotados
  - Partições críticas: `/var/log` acumula logs; `/tmp` acumula temporários; `/` cheia para o sistema
  - Por que 100% do disco mata serviços mesmo com binários ainda funcionando
- **Diálogo AURA-7:** *"Encontrei `/var` com 98% de uso. Isso explica por que o SGBD de agendamentos não consegue criar arquivos de transação. Um banco de dados sem espaço para journaling é como um dentista sem luva — você pode até continuar, mas as consequências serão terríveis."*

---

#### Nível 116 — Identificando os Maiores Consumidores de Espaço

- **Contexto:** O disco está quase cheio mas a pasta `/var` tem dezenas de subdiretórios. Identificar manualmente qual pasta está gigante é impraticável. Precisamos de um método sistemático para afunilar o problema.
- **Missão:** Usar `du -sh *` para listar o tamanho de cada diretório e identificar os maiores consumidores. Navegar recursivamente até encontrar o diretório exato que está estourando a cota.
- **Comando-Chave:** `du -sh *`, `du -sh /var/*`, `du -ah /var/log | sort -rh | head -20`, `ncdu /var` (se disponível)
- **Conceitos Abordados:**
  - `du` vs `df`: du mostra uso por arquivo/pasta; df mostra uso por partição
  - `-s`: summarize — mostra apenas o total do diretório, não subdiretórios
  - `-h`: human-readable (K, M, G)
  - `-a`: all — inclui arquivos individuais, não só diretórios
  - Pipeline com `sort -rh | head -20` para ordenar por tamanho
  - Logs rotativos e por que `/var/log` pode crescer descontroladamente
  - Arquivos de core dump em `/var/crash` ou `/core`
  - Arquivos temporários em `/tmp` e `/var/tmp`
- **Diálogo AURA-7:** *"Achamos o culpado: `/var/log/radiologia_sync.log` com 47GB. O processo que travava o CPU também estava logando absolutamente tudo — cada pixel de cada radiografia processada. Alguém esqueceu de configurar a rotação de logs."*

---

#### Nível 117 — Jobs em Background: Multitarefa no Terminal

- **Contexto:** Enquanto o servidor é reorganizado, você precisa executar um backup de 2 horas mas também continuar monitorando processos. O terminal não pode ficar bloqueado durante o backup.
- **Missão:** Aprender a enviar processos para background com `&`, listar jobs com `jobs`, trazer de volta ao foreground com `fg`, suspender com `Ctrl+Z` e retomar em background com `bg`.
- **Comando-Chave:** `comando &`, `jobs`, `fg %1`, `bg %1`, `Ctrl+Z`, `nohup comando &`, `disown`
- **Conceitos Abordados:**
  - Foreground vs Background: diferença de controle do terminal
  - `&`: envia processo para background ao iniciar
  - `Ctrl+Z`: suspende processo em foreground (estado STOPPED)
  - `jobs`: lista jobs do shell atual com seus números
  - `fg %N`: traz job N de volta ao foreground
  - `bg %N`: retoma job N suspenso em background
  - `nohup`: evita que o processo seja encerrado ao fechar o terminal (SIGHUP)
  - `disown`: remove job da lista do shell — sobrevive ao logout
  - Diferença entre job do shell e processo do sistema
- **Diálogo AURA-7:** *"Enviar o backup para background com nohup é fundamental. Sem isso, fechar o SSH mata o backup junto com a sessão. Já vi administradores perderem 8 horas de backup porque fecharam o terminal sem pensar. Não seja esse administrador."*

---

#### Nível 118 — Rastreando Arquivos Abertos por Processo

- **Contexto:** O processo de sincronização de radiografias está sendo executado novamente, mas agora você quer saber exatamente quais arquivos ele está acessando — suspeita-se que ele esteja lendo arquivos de pacientes que não deveria.
- **Missão:** Usar `lsof -p PID` para listar todos os arquivos, sockets e dispositivos abertos por um processo específico. Identificar conexões de rede abertas e arquivos sendo lidos ou escritos.
- **Comando-Chave:** `lsof -p PID`, `lsof -u usuario`, `lsof /caminho/arquivo`, `lsof -i :porta`, `lsof -i TCP`
- **Conceitos Abordados:**
  - `lsof` = List Open Files — no Linux, tudo é arquivo (incluindo sockets e devices)
  - Colunas: COMMAND, PID, USER, FD, TYPE, DEVICE, SIZE, NODE, NAME
  - Tipos de FD: cwd (diretório atual), txt (executável), mem (mmap), números (descritores)
  - Tipos: REG (arquivo regular), DIR, CHR (char device), IPv4/IPv6 (socket de rede)
  - Identificar conexões de rede abertas por processo
  - Verificar se um arquivo deletado ainda está sendo mantido aberto (liberação de espaço em disco)
  - Encontrar qual processo está bloqueando um arquivo
- **Diálogo AURA-7:** *"Interessante. O processo de sincronização tem 847 arquivos abertos — incluindo `/var/data/pacientes/prontuarios/` inteiro. Acesso massivo a prontuários não relacionados ao processo. Isso pode ser um problema de conformidade com a LGPD, não apenas de performance."*

---

#### Nível 119 — Prioridade de Execução: Quem Passa na Frente

- **Contexto:** A OralTech tem dois serviços críticos: o sistema de agendamento (deve ter prioridade máxima) e o processo de backup (pode ser lento). Atualmente ambos concorrem igualmente pela CPU, degradando o agendamento.
- **Missão:** Usar `nice` para iniciar processos com prioridade ajustada e `renice` para alterar a prioridade de processos já em execução. Entender a escala de niceness e sua relação com a prioridade real de CPU.
- **Comando-Chave:** `nice -n 19 comando` (mais gentil), `nice -n -20 comando` (mais agressivo — requer root), `renice -n 10 -p PID`, `renice -n -5 -g grupo`
- **Conceitos Abordados:**
  - Niceness: valor de -20 (maior prioridade) a +19 (menor prioridade), padrão é 0
  - Apenas root pode definir valores negativos (alta prioridade)
  - Usuário comum pode aumentar niceness (ceder prioridade), nunca diminuir
  - Relação entre niceness e prioridade real (PR) — visível no htop
  - Prioridade de tempo real (RT): para sistemas embarcados e processos críticos
  - Estratégia: backup com nice +19, sistema crítico com nice -5
  - `chrt` para políticas de scheduling de tempo real (SCHED_FIFO, SCHED_RR)
- **Diálogo AURA-7:** *"Nice é o equivalente digital de educação. Um processo com nice +19 é aquele colega que sempre deixa os outros passarem na frente. Útil para backups e tarefas em segundo plano — você quer que eles existam, mas não que atrapalhem o que realmente importa."*

---

#### Nível 120 — [DESAFIO INTEGRADO] O Servidor da Clínica

- **Contexto:** 07h45. Segunda-feira. O servidor principal da OralTech entra em colapso uma hora antes da abertura da clínica. Load average: 8.4 em hardware de 2 núcleos. O sistema de agendamento está inacessível. Dezenas de pacientes têm consulta marcada para as 8h. Renato te liga: *"Você tem 15 minutos antes dos dentistas chegarem."*
- **Missão:** Diagnóstico completo e remediação de um servidor em estado crítico. O jogador deve executar as seguintes etapas em sequência lógica:
  1. **Identificar** o processo culpado pelo load alto usando `htop` ou `ps aux --sort=-%cpu`
  2. **Verificar** a memória com `free -h` — swap em uso crítico
  3. **Encerrar** o processo problemático com o sinal correto (SIGTERM primeiro, SIGKILL se necessário)
  4. **Verificar** o disco com `df -h` — identificar partição cheia
  5. **Localizar** o arquivo gigante com `du -ah /var/log | sort -rh | head -10`
  6. **Liberar** espaço comprimindo ou removendo logs antigos com `gzip` ou `rm`
  7. **Verificar** se o serviço de agendamento está voltando com `systemctl status agendamento`
  8. **Ajustar** prioridade do processo de backup (se em execução) com `renice +19`
- **Restrições do Desafio:**
  - Não pode reiniciar o servidor (pacientes com consultas ativas no sistema)
  - O arquivo de log do dia atual não pode ser deletado (auditoria)
  - O processo de radiologia deve ser encerrado com SIGTERM, não SIGKILL (risco de corrupção)
- **Critério de Vitória:** Load average abaixo de 1.5, swap abaixo de 50% de uso, disco com pelo menos 2GB livres, sistema de agendamento respondendo em menos de 3 segundos.
- **Diálogo AURA-7:** *"Parabéns. Load average normalizado em 0.8. Swap zerado. 4.2GB liberados em disco. Sistema de agendamento online. 7h58 — você tem dois minutos de margem. Isso não é sorte. É diagnóstico sistemático aplicado sob pressão. Esse é o trabalho real de um SysAdmin."*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Comando Principal | Dificuldade |
|:------|:-------|:------------------|:-----------|
| 111 | Processos em Execução | `ps aux` | ⭐⭐ |
| 112 | Monitoramento com htop | `htop` | ⭐⭐ |
| 113 | Sinais a Processos | `kill -15 / -9` | ⭐⭐⭐ |
| 114 | Consumo de Memória | `free -h` | ⭐⭐ |
| 115 | Uso de Disco | `df -h` | ⭐⭐ |
| 116 | Maiores Consumidores | `du -sh *` | ⭐⭐⭐ |
| 117 | Jobs em Background | `nohup`, `fg`, `bg` | ⭐⭐⭐ |
| 118 | Arquivos Abertos | `lsof -p` | ⭐⭐⭐⭐ |
| 119 | Prioridade de Processos | `nice`, `renice` | ⭐⭐⭐ |
| 120 | [Desafio] O Servidor da Clínica | Todos | ⭐⭐⭐⭐⭐ |

**XP Total do Módulo:** 2.400 XP  
**Título Desbloqueado:** 🩺 *"Médico de Servidores"*  
**Próximo Módulo:** Módulo 4 — Fundamentos de Redes e Acesso Remoto
