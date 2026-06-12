/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const translations = {
  pt: {
    operatorBunker: "Operador Bunker",
    credits: "R$ Créditos",
    systemClock: "SYSTEM CLOCK",
    neuralConfig: "Configurações neurais da AURA-7",
    auraTitle: "AURA-7 Assistant",
    soundToggle: "Alternar áudio de feedback",
    processing: "AURA-7 processando fluxo de rede tática...",
    loginTitle: "ROOT ACCESS: DevOps",
    loginBooting: "INICIALIZANDO SISTEMA...",
    loginSeq: "> SEQUÊNCIA DE INICIALIZAÇÃO DO SISTEMA",
    loginAuraDegraded: "AURA-7 Core Assistente está operando com apenas 35% de integridade neuronal.",
    loginRegister: "Para restabelecer comunicações encriptadas locais, faça o registro do Operador de Bunker:",
    loginLabel: "Nome do Operador / Usuário Unix:",
    loginBtn: "REGISTRAR E MONTAR CONEXÃO",
    settingsTitle: "CONFIGURAÇÕES NEURAIS DA AURA-7",
    settingsMode: "Modo Offline Simulado:",
    settingsOfflineDesc: "A AURA-7 utilizará respostas e dicas pré-definidas baseadas nas diretrizes locais de cada nível. Não requer chaves de nuvem ou execução de hardware de IA local.",
    settingsOnline: "Modo Online Gemini API (Nuvem):",
    settingsOnlineDesc: "Ativa o canal de inferência neural direto conectando à API do Google Cloud Gemini.",
    settingsKeyLabel: "Insira sua Gemini API Key:",
    settingsModelLabel: "Selecione o Modelo Generativo:",
    settingsSave: "SALVAR E RECONFIGURAR NÚCLEO",
    settingsClose: "FECHAR PAINEL NEURAL",
    jobBoard: "PAINEL DE CONTRATOS",
    activeJob: "CONTRATO ATIVO",
    noJob: "NENHUM CONTRATO ATIVO",
    jobDesc: "Descrição do Contrato:",
    jobInstructions: "Instruções do terminal para concluir o contrato:",
    jobCheckBtn: "VERIFICAR CONTRATO (VALIDAR)",
    jobReward: "Pagamento:",
    hintBtn: "OBTER DICA DA IA",
    tabTerminal: "Terminal",
    tabContracts: "Contratos",
    tabManual: "Manual",
    editorTitle: "NANO EDITOR - Editando:",
    editorSave: "SALVAR",
    editorCancel: "CANCELAR",
    editorEmpty: "Selecione ou crie um arquivo no terminal para editar.",
    terminalIntro: "Digite 'briefing' para rever as metas ou use 'ajuda' para listar comandos.",
    systemSynchronized: "AURA-7 Core Sincronizado: {integrity}% Integridade Neural.",
    commandNotRecognized: "bunker-shell: {cmd}: comando não reconhecido. Digite 'ajuda' para verificar as instruções.",
    manualTitle: "Manual de Operador Unix - Comandos Disponíveis:"
  },
  en: {
    operatorBunker: "Bunker Operator",
    credits: "$ Credits",
    systemClock: "SYSTEM CLOCK",
    neuralConfig: "AURA-7 Neural Configuration",
    auraTitle: "AURA-7 Assistant",
    soundToggle: "Toggle feedback audio",
    processing: "AURA-7 processing tactical network stream...",
    loginTitle: "ROOT ACCESS: DevOps",
    loginBooting: "INITIALIZING SYSTEM...",
    loginSeq: "> SYSTEM INITIALIZATION SEQUENCE",
    loginAuraDegraded: "AURA-7 Core Assistant is operating with only 35% neural integrity.",
    loginRegister: "To re-establish encrypted local communications, register the Bunker Operator:",
    loginLabel: "Operator Name / Unix User:",
    loginBtn: "REGISTER AND MOUNT CONNECTION",
    settingsTitle: "AURA-7 NEURAL CONFIGURATION",
    settingsMode: "Simulated Offline Mode:",
    settingsOfflineDesc: "AURA-7 will use pre-defined responses and hints based on the local guidelines of each level. Does not require cloud keys or local AI hardware execution.",
    settingsOnline: "Gemini API Online Mode (Cloud):",
    settingsOnlineDesc: "Activates the direct neural inference channel by connecting to the Google Cloud Gemini API.",
    settingsKeyLabel: "Enter your Gemini API Key:",
    settingsModelLabel: "Select Generative Model:",
    settingsSave: "SAVE AND RECONFIGURE CORE",
    settingsClose: "CLOSE NEURAL PANEL",
    jobBoard: "CONTRACT BOARD",
    activeJob: "ACTIVE CONTRACT",
    noJob: "NO ACTIVE CONTRACT",
    jobDesc: "Contract Description:",
    jobInstructions: "Terminal instructions to complete contract:",
    jobCheckBtn: "VERIFY CONTRACT (VALIDATE)",
    jobReward: "Payment:",
    hintBtn: "GET IA HINT",
    tabTerminal: "Terminal",
    tabContracts: "Contracts",
    tabManual: "Manual",
    editorTitle: "NANO EDITOR - Editing:",
    editorSave: "SAVE",
    editorCancel: "CANCEL",
    editorEmpty: "Select or create a file in the terminal to edit.",
    terminalIntro: "Type 'briefing' to review goals or 'ajuda' (or 'help') to list commands.",
    systemSynchronized: "AURA-7 Core Synchronized: {integrity}% Neural Integrity.",
    commandNotRecognized: "bunker-shell: {cmd}: command not recognized. Type 'ajuda' (or 'help') to check the instructions.",
    manualTitle: "Unix Operator Manual - Available Commands:"
  }
};

export const levelTranslations: Record<string, { name: string; briefing: string; hint?: string }> = {
  // Module 1 - Submodule 1 (levels 1-10)
  m1_s1_l1: {
    name: "Level 1 — First Sign of Life",
    briefing: "## 🎮 Freela Context\nYour development machine has ceased to function due to a forced block by Janela OS. Lacking the funds to purchase new hardware, you installed a Linux distribution on a lab computer powered by solar energy. The interface is strictly command-line text. AURA-7, your virtual assistant, is partially corrupted (35% integrity) and requires a neural signal to restore communication.\n\n## 🛠️ Mission\nSend the text message 'Olá, AURA' to the terminal's standard output.\n\n## 📝 Useful Commands\n* `echo`: Prints a line of text to the console.\n* `clear`: Clears the terminal screen.\n\n## 🎯 Success Criterion\nThe command `echo \"Olá, AURA\"` must be typed and executed successfully in the terminal.",
    hint: "Use the command: echo \"Olá, AURA\" to interact with the kernel and test the terminal."
  },
  m1_s1_l2: {
    name: "Level 2 — Operator Registration",
    briefing: "## 🎮 Freela Context\nTo secure the connection to local servers, AURA-7 requires you to write your identification code to the configuration file.\n\n## 🛠️ Mission\n1. Write your operator code into 'bunker.cfg' by appending the line 'OPERATOR_ID=1337'.\n\n## 🎯 Success Criterion\nThe file '/home/operator/bunker.cfg' must contain the line 'OPERATOR_ID=1337'.",
    hint: "Use 'echo \"OPERATOR_ID=1337\" >> bunker.cfg'"
  },
  m1_s1_l3: {
    name: "Level 3 — System Verification",
    briefing: "## 🎮 Freela Context\nAURA-7 needs to check the configuration file's contents to verify its integrity.\n\n## 🛠️ Mission\n1. Output the contents of the configuration file 'bunker.cfg' to the screen.\n\n## 🎯 Success Criterion\nThe command to display the content of 'bunker.cfg' must be executed.",
    hint: "Use 'cat bunker.cfg' to output the file contents."
  },
  m1_s1_l4: {
    name: "Level 4 — Manual Mode",
    briefing: "## 🎮 Freela Context\nBefore proceeding with the network setup, check the technical instructions left by the previous operator in a hidden file.\n\n## 🛠️ Mission\n1. Read the content of the hidden file '.manual_tecnico.txt' located in your home directory.\n\n## 🎯 Success Criterion\nThe hidden file '.manual_tecnico.txt' must be read using the terminal command.",
    hint: "Use 'cat .manual_tecnico.txt' or use 'ls -la' to list hidden files first."
  },
  m1_s1_l5: {
    name: "Level 5 — Directory Navigation",
    briefing: "## 🎮 Freela Context\nThe core configs of the local server are stored in the system configuration directory. Navigate there to explore the files.\n\n## 🛠️ Mission\n1. List the files inside the directory '/etc' to locate the configuration files.\n\n## 🎯 Success Criterion\nThe command to list the '/etc' folder must be executed in the terminal.",
    hint: "Use 'ls /etc' to list the files in the target directory."
  },
  m1_s1_l6: {
    name: "Level 6 — Consulting the Manual",
    briefing: "## 🎮 Freela Context\nYou are about to load a network authentication key for AURA-7, but you must validate the exact byte size of the buffer file `/home/operator/dados_rede.txt` before transmitting it to prevent an overflow. You know the `wc` command counts words/bytes, but cannot recall the option to count only bytes.\n\n## 🛠️ Mission\n1. Consult the help or manual page of `wc` using the `--help` option.\n2. Find the flag that counts bytes/characters.\n3. Execute `wc` with that option on `/home/operator/dados_rede.txt`.\n4. Save ONLY the resulting number (23) to a file named `bytes.txt` in your home directory.\n\n## 🎯 Success Criterion\nThe file `bytes.txt` must be created containing exactly the number `23`.",
    hint: "Use 'wc -c dados_rede.txt > bytes.txt' or run 'wc --help' to check the flags."
  },
  m1_s1_l7: {
    name: "Level 7 — Copying and Moving Modules",
    briefing: "## 🎮 Freela Context\nTo update AURA-7 subsystems, we need to manage legacy files in `/home/operator/legado`. The critical file `firmware.bin` must be copied as a backup. The old report `relatorio.txt` must be moved to the home directory and renamed.\n\n## 🛠️ Mission\n1. Create a directory named `backup` in your home folder.\n2. Copy the file `/home/operator/legado/firmware.bin` into the new `backup/` directory.\n3. Move `/home/operator/legado/relatorio.txt` to your home directory, renaming it to `relatorio_final.txt`.\n\n## 🎯 Success Criterion\n* The file `/home/operator/backup/firmware.bin` exists.\n* The file `/home/operator/relatorio_final.txt` exists.\n* The original file `/home/operator/legado/relatorio.txt` is removed.",
    hint: "Use 'mkdir backup', 'cp legado/firmware.bin backup/', and 'mv legado/relatorio.txt ./relatorio_final.txt'."
  },
  m1_s1_l8: {
    name: "Level 8 — Disk Cleanup",
    briefing: "## 🎮 Freela Context\nAURA-7 storage is reporting critical alerts due to insufficient disk space! Obsolete debug and cache folders are cluttering the drive. Perform a cleanup.\n\n## 🛠️ Mission\n1. Remove the file `/home/operator/cache.tmp`.\n2. Delete the folder `/home/operator/cache_velho/` along with all its subfiles in a single operation.\n\n## 🎯 Success Criterion\n* `/home/operator/cache.tmp` is deleted.\n* `/home/operator/cache_velho/` is deleted.",
    hint: "Use 'rm cache.tmp' and 'rm -r cache_velho'."
  },
  m1_s1_l9: {
    name: "Level 9 — File Types and Line Counts",
    briefing: "## 🎮 Freela Context\nYou retrieved three data blobs from AURA-7's corrupted drive: `arquivoA`, `arquivoB`, and `arquivoC` in `/home/operator/dados`. One of them is simple ASCII text, while others are compressed formats. Find the text file and output its line count.\n\n## 🛠️ Mission\n1. Determine the file type of `arquivoA`, `arquivoB`, and `arquivoC` using `file`.\n2. Identify the plain ASCII text file.\n3. Count the lines of the text file.\n4. Write the line count (42) to `/home/operator/resultado_contagem.txt`.\n\n## 🎯 Success Criterion\nThe file `/home/operator/resultado_contagem.txt` contains exactly the number `42`.",
    hint: "Run 'file dados/*' to check the types, then run 'wc -l' on the text file."
  },
  m1_s1_l10: {
    name: "Level 10 — The First Diagnosis",
    briefing: "## 🎮 Freela Context\nThe neighbor in Bunker 7 is running out of oxygen because the main coolers have stopped. Search the hidden directory `.bunker_config` for the thermal recovery script and run it.\n\n## 🛠️ Mission\n1. Find the script inside the hidden `.bunker_config/sistema/scripts/` directory.\n2. Add execute permissions to `./ligar_coolers.sh` and run it.\n\n## 🎯 Success Criterion\nThe cooling script must be executed successfully inside the container.",
    hint: "List files with 'ls -la', navigate to '.bunker_config/sistema/scripts/', change permission with 'chmod +x ligar_coolers.sh' and run it."
  },

  // Module 2 Milestone (Level 101, 110)
  m2_l101: {
    name: "Level 101 — Confidential Credentials Leak",
    briefing: "Your neighborhood shop database file `backup_credenciais.db` has insecure permissions (777). Modify it using chmod so that ONLY the owner can read and write to it.",
    hint: "Run: chmod 600 backup_credenciais.db"
  },
  m2_l110: {
    name: "Level 110 — The Pharmacy Constitution",
    briefing: "Give safe privileges to the caixas group. Edit the `/etc/sudoers` file safely using visudo to allow the 'caixas' group to restart the print service without typing a password.",
    hint: "Use visudo and add: %caixas ALL=(ALL) NOPASSWD: /usr/sbin/service lp restart"
  },

  // Module 3 Milestone (Level 111, 120)
  m3_l111: {
    name: "Level 111 — Executing Processes",
    briefing: "Check the active system processes using `ps` and identify the processes running under the current operator.",
    hint: "Use 'ps aux' or 'ps -ef'"
  },
  m3_l120: {
    name: "Level 120 — The Clinic Server Crisis",
    briefing: "A regional dental clinic server is running critically slow. Investigate using CPU tools, identify the misbehaving process, kill it safely, and clean log files to free up disk space.",
    hint: "Identify the high load process using top/htop, kill it with 'kill -15' or 'kill -9', and locate space-hogging log files with 'du -sh'."
  },

  // Module 4 Milestone (Level 121, 130)
  m4_l121: {
    name: "Level 121 — Networking Interfaces",
    briefing: "Display the local active networking interfaces and read the IP addresses assigned to them.",
    hint: "Use 'ip addr' or 'ifconfig'"
  },
  m4_l130: {
    name: "Level 130 — The Offline Branch Office",
    briefing: "The regional branch is offline. Diagnose the network path using ping and traceroute, check name resolution, log in via SSH, and configure the UFW firewall to allow the correct service port.",
    hint: "Diagnose path, use dig/nslookup, SSH into target, and run 'ufw allow' for the service port."
  },

  // Module 5 Milestone (Level 131, 140)
  m5_l131: {
    name: "Level 131 — Loops in Bash",
    briefing: "Write a simple loop in Bash that iterates over a static list of directories and checks their properties.",
    hint: "Use: for dir in list; do ... done"
  },
  m5_l140: {
    name: "Level 140 — The FreshBox Automated Healthcheck",
    briefing: "Write a production-ready Bash script that monitors 3 endpoints, retries on transient errors, logs timestamps, and writes system files on persistent service outages.",
    hint: "Combine while loops, curl status code validation, file redirection, and conditional testing."
  },

  // Module 7 Milestone (Level 151, 160)
  m7_l151: {
    name: "Level 151 — Intro to Containerization",
    briefing: "Launch a container using docker and list the active running docker containers in the system.",
    hint: "Use 'docker run' followed by 'docker ps'"
  },
  m7_l160: {
    name: "Level 160 — Microservice Orchestration",
    briefing: "Configure a multi-service docker-compose setup where the web server app links to a Redis store on an isolated private network, mapping volumes and variables properly.",
    hint: "Define networks, volumes, and environment variables in docker-compose.yml and run docker-compose up."
  },

  // Module 9 Milestone (Level 171, 180)
  m9_l171: {
    name: "Level 171 — Nginx as a Web Server",
    briefing: "Configure Nginx to serve the static landing page for the fintech company on the default port.",
    hint: "Edit the configuration in /etc/nginx/nginx.conf and start Nginx using systemctl start nginx."
  },
  m9_l180: {
    name: "Level 180 — Nginx Gateway Blueprint",
    briefing: "Construct a complete Nginx gateway block with load balancing (round-robin), caching rules, and rate limits configured on a secure reverse proxy.",
    hint: "Use limit_req_zone, proxy_cache, and upstream blocks in nginx.conf."
  },

  // Module 14 Milestone (Level 221, 230)
  m14_l221: {
    name: "Level 221 — PostgreSQL Memory Tuning",
    briefing: "Tune memory and buffer limits on the database node config files to align with server resource capacities.",
    hint: "Modify shared_buffers and work_mem values in postgresql.conf."
  },
  m14_l230: {
    name: "Level 230 — DB HA Failover Recovery",
    briefing: "A database master crash has occurred. Promote the replica instance to master, redirect the PgBouncer pooler, and recover full read/write consistency.",
    hint: "Run pg_ctl promote or touch replication trigger file, then reload pgbouncer configurations."
  }
};
