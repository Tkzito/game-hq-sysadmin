import { Challenge, VirtualFS } from "../types";

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    module: "Módulo 1: O Despertar do Shell",
    name: "Cadeia de Inicialização Quebrada",
    actName: "Ato I: O Despertar",
    difficulty: "Fácil",
    salary: 100,
    briefing: "AURA-7 está offline e seu terminal opera sob energia degradada. Você precisa editar o arquivo 'boot_assist.sh' na sua pasta raiz para corrigir o erro de sintaxe das aspas abertas na linha que inicia com 'echo' e depois rodar o script usando 'sh boot_assist.sh' ou './boot_assist.sh'. Isso restabelecerá o canal neural em 35% de integridade.",
    storySegment: "O Janela OS declarou seu equipamento obsoleto. Sendo um estudante de TI com pouco dinheiro e muita rebeldia, você optou pela autonomia: formatou o HD e instalou o terminal de código aberto. Agora você precisa reativar o núcleo de AURA-7, sua IA assistente corrompida, para começar os freelas e pagar as contas de energia solar do bunker...",
    initialFS: {
      "/": {
        "boot_assist.sh": {
          type: "file",
          content: `# BOOT ASSISTANCE DAEMON v0.9\n# ERRO: Feche as aspas abertas no comando echo abaixo!\n\necho "Iniciando núcleo central AURA-7...\nexport INTEGRITY=35\necho "RESTAURAÇÃO COMPLETA: SISTEMA OPERANTE"\necho "Sinal de link neural online."\n`,
          permissions: 644
        },
        "instrucoes_de_login.txt": {
          type: "file",
          content: "Seja bem-vindo, Operador.\n\nPara iniciar a AURA-7:\n1. Digite 'nano boot_assist.sh' ou clique em Editar ao lado do arquivo.\n2. Feche a aspa dupla no final da frase: 'Iniciando núcleo central AURA-7...\"\n3. Salve o arquivo.\n4. Na linha de comando, digite: 'sh boot_assist.sh' para dar boot nela!\n\nUse 'ls' para ver os arquivos e 'cat' para ler.",
          permissions: 444
        }
      }
    },
    liveSchematicType: "solar_power",
    successCondition: (fs: VirtualFS, variables?: Record<string, any>) => {
      // Checked if they executed boot_assist.sh and successfully solved the syntax error
      if (variables?.ranBootAssist === true) {
        const file = fs["/"]?.["boot_assist.sh"];
        if (file && file.content) {
          const hasUnclosed = /echo\s+"Iniciando [^"\n]*$/.test(file.content) || file.content.includes('echo "Iniciando núcleo central AURA-7...\n');
          if (!hasUnclosed || file.content.includes('echo "Iniciando núcleo central AURA-7..."')) {
            return { success: true, message: "Canal neural conectado com sucesso! Sistema AURA-7 online em modo seguro (Integridade: 35%)." };
          } else {
            return { success: false, message: "O script falhou na execução devido ao erro 'SyntaxError: Unterminated string'. Feche as aspas na primeira instrução 'echo'!" };
          }
        }
      }
      return { success: false };
    },
    hint: "Use 'nano boot_assist.sh' para abrir o editor tático. Mude a linha: \necho \"Iniciando núcleo central AURA-7... \npara: \necho \"Iniciando núcleo central AURA-7...\" \nDepois digite Ctrl+O (salvar), Enter (confirmar), Ctrl+X (sair), e execute 'sh boot_assist.sh'."
  },
  {
    id: 2,
    module: "Módulo 2: Permissões, Usuários e Segurança POSIX",
    name: "Vazamento de Credenciais Confidenciais",
    actName: "Ato I: O Despertar",
    difficulty: "Fácil",
    salary: 250,
    briefing: "Muitos vizinhos confiam a você a segurança de suas pequenas mercearias. Seu software de varredura encontrou um arquivo crítico chamado 'backup_credenciais.db' exposto com permissões universais inseguras (777). Para estancar o vazamento e fechar a invasão, modifique o arquivo com 'chmod' de forma que APENAS o usuário proprietário possa ler e escrever (permissão RW: 600 ou u=rw,go=).",
    storySegment: "O Sr. Manoel da Mercearia do Bairro está desesperado. Um grupo de garotos descobriu o backup de logins do sistema de vendas dele e andou dando descontos indevidos em doces. Você descobriu que a pasta de logs foi exposta de forma pública na internet por negligência do antigo técnico. Tempo de dar privacidade ao Sr. Manoel!",
    initialFS: {
      "/": {
        "backup_credenciais.db": {
          type: "file",
          content: "# BANCO DE LOGINS CENTRAL DA MERCEARIA\nadmin:sha256:88924b1ac803\nmanoel_vendas:sha256:99f7a92b21c5\n[!] ATENÇÃO: Corrija as permissões usando chmod para que curiosos locais não leiam o arquivo!",
          permissions: 777
        },
        "instrucoes.txt": {
          type: "file",
          content: "Use o comando 'ls -l' ou 'ls -la' para inspecionar as permissões do arquivo 'backup_credenciais.db'.\n\nModifique o acesso usando 'chmod 600 backup_credenciais.db'.\nIsso dará permissão de leitura e escrita unicamente ao dono (u+rw, go-rwx).",
          permissions: 644
        }
      }
    },
    liveSchematicType: "security_mesh",
    successCondition: (fs: VirtualFS) => {
      const file = fs["/"]?.["backup_credenciais.db"];
      if (file) {
        if (file.permissions === 600) {
          return { success: true, message: "Fantástico! O arquivo de credenciais da Mercearia agora está restrito ao proprietário. Sr. Manoel enviou uma gorjeta extra!" };
        } else if (file.permissions === 777) {
          return { success: false, message: "A segurança continua comprometida! O arquivo backup_credenciais.db ainda está em modo universal público (-rwxrwxrwx)." };
        } else {
          return { success: false, message: `Permissões modificadas para ${file.permissions}, mas o objetivo é isolar completamente (modo 600 ou -rw-------).` };
        }
      }
      return { success: false, message: "O arquivo backup_credenciais.db desapareceu! Recrie-o ou reinicie a fase." };
    },
    hint: "Digite o comando: 'chmod 600 backup_credenciais.db' e em seguida verifique as permissões digitando 'ls -la'. Elas devem exibir '-rw-------'!"
  },
  {
    id: 3,
    module: "Módulo 3: Monitoramento de Processos e Recursos",
    name: "Invasão Silenciosa (CPU Overload)",
    actName: "Ato II: O Profissional",
    difficulty: "Médio",
    salary: 400,
    briefing: "Um malware espião clandestino descarregou scripts maliciosos em background que estão superaquecendo os chips do Bunker Server e sugando toda a banda solar. Use 'ps aux' ou 'ps' para listar os processos em execução, descubra o Process ID (PID) do processo sob o nome 'spyware.sh' e despache o sinal de aniquilação usando 'kill -9 <PID>' ou 'kill <PID>'.",
    storySegment: "Sua conta do SysAdmin-Jobs recebeu um alerta urgente do seu próprio cluster. Em uma varredura de rotina, AURA-7 notificou um gargalo crítico em sua usina fotovoltaica: os coolers e microcontroladores estão drenando o dobro Amperagem habitual de bateria. Invasores se infiltraram na sua máquina!",
    initialFS: {
      "/": {
        "readme.txt": {
          type: "file",
          content: "Monitore os processos do sistema operacional!\n\n1. Use 'ps' ou 'ps aux' para listar as instâncias de processos ativos.\n2. Procure o ID numérico (PID) sob a coluna correspondente a 'spyware.sh'.\n3. Execute 'kill -9 <PID>' para cessar a atividade invasora.\n",
          permissions: 644
        }
      },
      "/usr/bin": {
        "spyware.sh": {
          type: "file",
          content: "#!/bin/bash\n# CLANDESTINE BITCOIN MINER / TRAFFIC SNIFFER\nwhile true; do dd if=/dev/urandom | bzip2 -9 > /dev/null; done",
          permissions: 755
        }
      }
    },
    liveSchematicType: "cpu_temperature",
    successCondition: (fs: VirtualFS, variables?: Record<string, any>) => {
      if (variables?.killedPID === 1337 || variables?.killedProcess === "spyware.sh") {
        return { success: true, message: "Processo espião liquidado! A temperatura do chip core estabilizou novamente. O fluxo solar está restaurado e as baterias voltaram a carregar de forma normal." };
      }
      return { success: false, message: "O monitor de temperatura aponta 94°C. O firmware do processador espião continua ativo drena os ciclos da CPU!" };
    },
    hint: "Rode 'ps aux' para ver a lista de processos Simulados. Você verá um processo chamado 'spyware.sh' com o PID 1337. Interrompa o invasor rodando: 'kill 1337'."
  },
  {
    id: 4,
    module: "Módulo 4: Fundamentos de Redes e Acesso Remoto",
    name: "Túnel Seguro & Backup Distribuído",
    actName: "Ato II: O Profissional",
    difficulty: "Médio",
    salary: 600,
    briefing: "Sua missão é buscar uma chave de segurança gerada externamente no servidor local 'http://bunker-api.local/get-keys' e salvá-la localmente como 'chaves.key'. Em seguida, envie este arquivo criptografado de modo seguro para o servidor de custódia descentralizado na rede e IP '10.0.0.4' sob o usuário 'backup' usando o utilitário 'scp chaves.key backup@10.0.0.4:/backup'.",
    storySegment: "A cooperativa de produtores orgânicos do interior foi alvo de sabotagem. Os arquivos do balanço fiscal anual foram travados, mas um servidor redundante gerou uma contra-chave de restauração na intranet. Seu trabalho de SysAdmin júnior é recuperar essa chave via requisição de dados de rede e assegurar que ela seja enviada ao cofre criptográfico descentralizado.",
    initialFS: {
      "/": {
        "README.md": {
          type: "file",
          content: "# Custódia de Cripto-Ativos\n\nPasso a passo:\n1. Requisite e salve os dados com: 'curl -o chaves.key http://bunker-api.local/get-keys'\n2. Verifique se o arquivo 'chaves.key' foi criado na sua raiz usando 'ls'.\n3. Desprenda a transferência criptografada via SCP com: 'scp chaves.key backup@10.0.0.4:/backup'",
          permissions: 644
        }
      }
    },
    liveSchematicType: "ssh_routes",
    successCondition: (fs: VirtualFS, variables?: Record<string, any>) => {
      const hasKeyFile = fs["/"]?.["chaves.key"] !== undefined;
      const ranTransfer = variables?.scpTransferred === true && variables?.scpTarget === "backup@10.0.0.4:/backup";
      
      if (hasKeyFile && ranTransfer) {
        return { success: true, message: "Incrível! As chaves de segurança foram baixadas e movidas via canal SSH encriptado para a custódia central. A cooperativa salvou a auditoria e compensou você com créditos substanciais!" };
      }
      
      if (!hasKeyFile) {
        return { success: false, message: "A chave de segurança 'chaves.key' não foi localizada no seu diretório raiz local. Busque-a primeiro usando o curl." };
      }
      
      return { success: false, message: "A cópia de segurança via protocolo SCP para backup@10.0.0.4:/backup não foi executada ou falhou. Transfira o arquivo!" };
    },
    hint: "Primeiro, digite: 'curl -o chaves.key http://bunker-api.local/get-keys'. Isso criará o arquivo. Em seguida, transfira-o rodando: 'scp chaves.key backup@10.0.0.4:/backup'."
  },
  {
    id: 5,
    module: "Módulo 5: Automação e Shell Scripting Avançado",
    name: "Varredura Antivírus e Extração de Logs",
    actName: "Ato III: O Especialista",
    difficulty: "Difícil",
    salary: 800,
    briefing: "Uma infecção massiva em servidores industriais de IoT gerou milhares de logs. Você precisa isolar as linhas de ameaças. Escreva ou execute uma varredura: busque todas as ocorrências da palavra 'MALWARE' em todos os arquivos contidos na pasta '/temp_logs/' e redirecione todas essas ocorrências encontradas para um único arquivo chamado '/temp_logs/incidentes.log'.",
    storySegment: "O reservatório de saneamento municipal detectou logs de atividade anômala, suspeitando de um ataque direcionado ao firmware das comportas. Milhões de linhas estão divididas em múltiplos relatórios. Você precisa construir um extrator rápido de padrões para gerar o sumário de incidentes imediatamente.",
    initialFS: {
      "/": {
        "auto_limpeza.sh": {
          type: "file",
          content: "#!/bin/bash\n# ESCREVA SEU SCRIPT DE EXTRAÇÃO AQUI SE DESEJAR\n# Ou execute os comandos diretamente no terminal.\n",
          permissions: 755
        }
      },
      "/temp_logs": {
        "log1.txt": {
          type: "file",
          content: "08:12:01 INFO: Conexão bem-sucedida do sensor de pressão.\n08:14:22 WARNING: Temperatura do core ultrapassou 45C.\n08:16:01 ALERT: MALWARE DETECTED IN NODE 3: SIGNATURE EXP-992\n08:18:40 INFO: Telemetria enviada via HTTPS.",
          permissions: 644
        },
        "log2.txt": {
          type: "file",
          content: "09:00:10 INFO: Calibração de atuador 4 ativada.\n09:02:11 CRITICAL: MALWARE INFECTION ATTACK FROM WEB IP 192.168.1.100\n09:05:00 INFO: Tentativa de reautenticação segura.",
          permissions: 644
        }
      }
    },
    liveSchematicType: "shell_loop",
    successCondition: (fs: VirtualFS, variables?: Record<string, any>) => {
      const logFile = fs["/temp_logs"]?.["incidentes.log"];
      if (logFile && logFile.content) {
        const c = logFile.content;
        const hasNode3 = c.includes("MALWARE DETECTED IN NODE 3");
        const hasInfection = c.includes("MALWARE INFECTION ATTACK");
        
        if (hasNode3 && hasInfection) {
          return { success: true, message: "Excelente extrator! O arquivo /temp_logs/incidentes.log reuniu de forma acurada ambos os alertas de ameaça, auxiliando o painel principal a vetar as portas de dados." };
        } else {
          return { success: false, message: "O arquivo incidentes.log foi criado, mas não contém as linhas corretas. Certifique-se de filtrar pela palavra 'MALWARE' da pasta /temp_logs." };
        }
      }
      return { success: false, message: "O arquivo de resultados '/temp_logs/incidentes.log' não foi criado com as linhas filtradas." };
    },
    hint: "Você pode resolver isso em uma linha rodando: \ngrep \"MALWARE\" /temp_logs/* > /temp_logs/incidentes.log \nou criando e rodando seu script para fazer o mesmo isolamento."
  },
  {
    id: 6,
    module: "Módulo 7: Conteinerização e Orquestração Local",
    name: "Microserviço Descentralizado Docker",
    actName: "Ato III: O Especialista",
    difficulty: "Difícil",
    salary: 1200,
    briefing: "Sua tarefa é orquestrar uma nova rede isolada para testar o app em um Dockerfile leve. Crie um arquivo chamado 'Dockerfile' no diretório raiz '/', adicione as linhas essenciais para herdar da imagem 'alpine' (FROM alpine), copiar o diretório atual (COPY . .) e expor as portas de comunicação (EXPOSE 3000), então execute o comando 'docker build -t app:v1 .' para embalar o container.",
    storySegment: "Você foi contatado para escalar a capacidade operacional de um servidor de mensagens criptografadas descentralizado que opera sob ataque governamental de censura. O segredo é isolamento total: empaquetar o nó operacional em um container leve que pode ser iniciado em 1.2 segundos em qualquer hardware doméstico do mundo.",
    initialFS: {
      "/": {
        "app.js": {
          type: "file",
          content: "// MICROSERVIÇO DE COMUNICAÇÃO DE REDE CRYPTO-CHAT\nconst express = require('express');\nconst app = express();\napp.get('/', (req,res) => res.send('NÓ SEGURO ATIVO'));\napp.listen(3000);",
          permissions: 644
        },
        "LEIA-ME.txt": {
          type: "file",
          content: "1. Crie o arquivo 'Dockerfile' na raiz.\n2. Defina os comandos dentro do arquivo:\n   FROM alpine\n   COPY . /app\n   EXPOSE 3000\n3. Construa a imagem rodando o comando: 'docker build -t app:v1 .'",
          permissions: 644
        }
      }
    },
    liveSchematicType: "cluster_status",
    successCondition: (fs: VirtualFS, variables?: Record<string, any>) => {
      const dockerfileExist = fs["/"]?.["Dockerfile"] !== undefined;
      const ranBuild = variables?.dockerBuilt === true;
      
      if (dockerfileExist && ranBuild) {
        const dfContent = fs["/"]?.["Dockerfile"]?.content || "";
        if (dfContent.toLowerCase().includes("from alpine")) {
          return { success: true, message: "Perfeito! A imagem Docker modular do microserviço foi compilada e isolada. O nó descentralizado subiu em tempo recorde de 0.8s, distribuindo o espelho de comunicações globalmente!" };
        } else {
          return { success: false, message: "O Dockerfile foi criado, mas não está utilizando 'FROM alpine' como base de imagem leve sugerida." };
        }
      }
      
      if (!dockerfileExist) {
        return { success: false, message: "O arquivo de configuração 'Dockerfile' não foi criado no seu diretório raiz local." };
      }
      
      return { success: false, message: "O Dockerfile existe, mas a instrução de compilação da imagem ('docker build -t app:v1 .') não foi executada." };
    },
    hint: "Escreva o arquivo 'Dockerfile' (use o botão 'Criar Arquivo' ou nano Dockerfile) incluindo:\nFROM alpine\nCOPY . /app\nEXPOSE 3000\nDepois salve e execute o build no console digitando:\ndocker build -t app:v1 ."
  }
];
