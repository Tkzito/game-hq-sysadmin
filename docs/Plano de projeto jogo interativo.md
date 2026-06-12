# ROOT ACCESS: DevOps Chronicles
## Plano de Projeto e Bíblia Narrativa Completa

---

## 🎮 APRESENTAÇÃO DO JOGO

### O Concepto
**ROOT ACCESS: DevOps Chronicles** é um simulador educativo de hacking e administração de sistemas. A interface imersiva une estética pixel art cyberpunk, efeito CRT de monitor antigo e um terminal de linha de comando 100% interativo e funcional.

O jogador não lê sobre Linux — ele **usa** o Linux. Cada desafio é um problema real que profissionais de TI enfrentam no mercado de trabalho. A história contextualiza o porquê de cada comando ser necessário, tornando o aprendizado técnico natural e motivador.

### O Enredo Central: A Grande Obsolescência
> *"Eles disseram que minha máquina era velha. Que não tinha os chips certos. Que eu precisava comprar um novo computador para rodar o novo sistema. Mas minha máquina rodava tudo o que eu precisava. Eu sabia que era mentira. Foi aí que encontrei o terminal — e percebi que nunca mais dependeria de ninguém para usar meu próprio computador."*
> — O Protagonista, Nível 1.

O ano é 2026. A corporação por trás do **"Janela OS"** lança uma atualização compulsória sob o pretexto de "segurança avançada com inteligência artificial integrada". Nos bastidores, o resultado prático é simples: mais de 50% dos computadores do mundo são instantaneamente declarados **"obsoletos e incompatíveis"** — incluindo máquinas de apenas 5 ou 6 anos com hardware perfeitamente funcional.

O motivo real? Novos chips de segurança proprietários exigidos pelo Janela OS que só existem em modelos lançados nos últimos 2 anos. Quem não tem hardware novo, simplesmente fica para trás.

O protagonista — um jovem estudante de TI — se recusa a aceitar isso. Com sua máquina de estudos bloqueada pela atualização e sem dinheiro para comprar um novo computador, ele formata o disco e instala um **sistema operacional de código aberto baseado em Linux**: gratuito, leve, poderoso, e que roda em qualquer hardware.

O problema: o sistema de código aberto não tem interface gráfica amigável. Para controlá-lo de verdade, para extrair seu potencial máximo, ele precisa aprender a falar **a língua do computador**:

~ $ _


A **linha de comando**. O terminal. O shell.

Para pagar as contas enquanto estuda, ele atua de forma **autônoma e informal** prestando serviços locais (vizinhos, parentes, pequenos comércios do bairro). À medida que ele se desenvolve e estuda para certificações internacionais (LPIC-1 / LFCS), ele começa a obter contratos mais robustos através da plataforma **SysAdmin-Jobs**. A jornada o leva de autônomo local a SysAdmin Júnior, DevOps Engineer, e finalmente, SRE de elite e Especialista em Cibersegurança Internacional.

### A Progressão Narrativa em 4 Atos

| Ato | Módulos | Cenário | Perfil do Protagonista |
|-----|---------|---------|------------------------|
| **Ato I: O Despertar** | Módulo 1 (Níveis 1-100) | Laboratório doméstico, bairro, freelas informais | Iniciante absoluto, trabalhador autônomo local |
| **Ato II: O Profissional** | Módulos 2, 3 e 4 (Níveis 101-130) | Pequenas e médias empresas locais | SysAdmin Júnior, resolvendo problemas reais de segurança e processos |
| **Ato III: O Especialista** | Módulos 5 e 6 (Níveis 131-150) | Startups e fintechs em crescimento | DevOps Engineer, automatizando, versionando e entregando código |
| **Ato IV: O Engenheiro** | Módulos 7 e 8 (Níveis 151-170) | Grandes corporações e infraestrutura crítica | SRE Sênior e Especialista em Cibersegurança Internacional |

### Personagens Principais
- **O Protagonista**: Um jovem desenvolvedor e SysAdmin em evolução. Mora em área rural, tem um laboratório doméstico abastecido por energia solar. Determinado, curioso e metódico.
- **AURA-7**: Uma IA assistente integrada ao terminal do protagonista. Está parcialmente corrompida no início do jogo (35% de integridade) e vai se recuperando conforme o jogador avança. É a guia, dando dicas contextuais e reagindo emocionalmente aos erros e acertos do jogador. Para garantir a soberania do laboratório e manter o projeto 100% gratuito e offline, seu processamento consome o barramento da API local alimentada pelo modelo `bunker-core` via Ollama.
- **SysAdmin-Jobs**: A plataforma de freelancers que conecta o protagonista aos clientes. Funciona como o HUB de missões do jogo.

### Como o Jogo Funciona
1. **Tela de HQ** → Apresentação visual da história e do novo desafio (narrativa em painéis)
2. **Hub de Freelas** → Interface onde o jogador escolhe as missões disponíveis
3. **Modal de Briefing** → Detalhe completo do problema com as pistas e metas
4. **Terminal Interativo** → Console 100% interativo onde o jogador executa os comandos reais no sandbox Docker
5. **Monitoramento (Live Feed)** → Janela de feedback animada (CCTV/Diagramas de rede em GIF) mostrando o impacto em tempo real das ações
6. **Tela de Vitória** → E-mail de agradecimento, créditos e liberação do próximo nível

---

## 📖 BÍBLIA DE NÍVEIS: LOCALIZAÇÃO E MAPEAMENTO DOS DIRETÓRIOS

Para manter o ecossistema modular, portátil e otimizado para o Docker, os planejamentos de cada módulo estão divididos em arquivos dedicados na raiz do projeto, mapeando as metas diretamente para subdiretórios específicos dentro do barramento de sandboxes:

### 📑 Arquivos de Detalhe e Roadmaps de Estudo (Raiz do Workspace)
* **[MÓDULO 1: O Despertar do Shell (Níveis 1-100)](./modulo1.md)** | **[Roadmap M1](./modulo1_roadmap.md)**
    * *Foco:* Curso Completo de Shell Script (Nível Certificação Internacional). Autônomo informal, básico de terminal, scripts profissionais, tratamento de erros, getopts, regex, parsers de configurações, redirecionamentos, banco textual e interfaces Dialog. Preparatório para LPIC-1/LFCS.
    * *Diretório dos Containers:* `levels/modulo1/sub1/` até `sub10/`
* **[MÓDULO 2: Permissões, Usuários e Segurança POSIX (Níveis 101-110)](./modulo2.md)** | **[Roadmap M2](./modulo2_roadmap.md)**
    * *Foco:* Gestão de usuários/grupos, chmod (octal/simbólico), chown, controle de privilégios delegados e configuração do sudoers.
    * *Diretório dos Containers:* `levels/modulo2/`
* **[MÓDULO 3: Monitoramento de Processos e Recursos (Níveis 111-120)](./modulo3.md)** | **[Roadmap M3](./modulo3_roadmap.md)**
    * *Foco:* Sinais de processos (kill, sigterm, sigkill), consumo de CPU/Memória (htop, free), uso de disco (df, du) e jobs em background.
    * *Diretório dos Containers:* `levels/modulo3/`
* **[MÓDULO 4: Fundamentos de Redes e Acesso Remoto (Níveis 121-130)](./modulo4.md)** | **[Roadmap M4](./modulo4_roadmap.md)**
    * *Foco:* Interfaces de rede, resolução DNS, rastreamento de rotas, download de pacotes, túneis criptografados SSH, scp e regras de firewall (ufw).
    * *Diretório dos Containers:* `levels/modulo4/`
* **[MÓDULO 5: Automação e Shell Scripting Avançado (Níveis 131-140)](./modulo5.md)** | **[Roadmap M5](./modulo5_roadmap.md)**
    * *Foco:* Scripts dinâmicos com loops (for/while), verificações condicionais de arquivos/pastas, agendamento com cron e inputs interativos.
    * *Diretório dos Containers:* `levels/modulo5/`
* **[MÓDULO 6: Versionamento e Pipeline CI/CD (Níveis 141-150)](./modulo6.md)** | **[Roadmap M6](./modulo6_roadmap.md)**
    * *Foco:* Git (commits, merges, branchs), hooks automáticos (pre-commit, post-receive) e pipelines de deploy.
    * *Diretório dos Containers:* `levels/modulo6/`
* **[MÓDULO 7: Conteinerização e Orquestração Local (Níveis 151-160)](./modulo7.md)** | **[Roadmap M7](./modulo7_roadmap.md)**
    * *Foco:* Ciclo de vida Docker, criação de Dockerfiles customizados, injeção de variáveis de ambiente e docker-compose multi-serviços.
    * *Diretório dos Containers:* `levels/modulo7/`
* **[MÓDULO 8: Engenharia de Confiabilidade de Sistemas (SRE) & Cibersegurança Internacional (Níveis 161-170)](./modulo8.md)** | **[Roadmap M8](./modulo8_roadmap.md)**
    * *Foco:* Clusterctl, redundância, failover e mitigação de DDoS.
    * *Diretório dos Containers:* `levels/modulo8/`

### 📁 Regra de Mapeamento Físico de Sandboxes (Pasta `levels/`)
Para garantir a execução em containers isolados, a pasta `levels/` segue uma convenção estrita de nomenclatura que permite ao orquestrador Python ler, construir e instanciar as fases de forma dinâmica através do socket `/var/run/docker.sock`:

```text
levels/
├── modulo1/               # Raiz do Curso de Shell Script
│   ├── sub1/              # Submódulo 1.1: O Despertar do Shell (Níveis 1 a 10)
│   │   ├── level1/        # Pasta física do Nível 1 (Contém Dockerfile, scripts e assets locais)
│   │   ├── level2/        # Pasta física do Nível 2
│   │   └── ...
│   ├── sub2/              # Submódulo 1.2: Programas vs Scripts & Boas Práticas (11 a 20)
│   ├── sub3/              # Submódulo 1.3: Manipulação de Arquivos e Busca (21 a 30)
│   └── ...
├── modulo2/               # Raiz das fases do Módulo 2 (Níveis 101 a 110)
└── ...
⚙️ MECÂNICAS GERAIS E ARQUITETURA TÉCNICA
1. Core Loop (A Dinâmica Principal)
Para que o jogo seja educativo e divertido, o loop principal deve integrar o visual 2D com a lógica do terminal:

[Obstáculo no Mapa 2D] ➔ [Interação/Abertura do Terminal] ➔ [Digitação do Comando Shell] ➔ [Resultado Visual no Jogo]

Movimentação/Navegação: O mapa do jogo é estruturado como um sistema de arquivos. Para mudar de sala, o jogador precisa digitar cd sala_norte. Para ver o que há na sala, ele usa ls.

Manipulação de Objetos: Há um baú trancado chamado bau.tar.gz. O jogador precisa digitar tar -vzxf bau.tar.gz para "abrir" o baú e liberar os itens na tela 2D.

Gerenciamento de Processos (Combate ou Defesa): Inimigos (representando glitches ou malwares) aparecem. O jogador usa ps aux para descobrir o ID do processo do inimigo e kill -9 [PID] para derrotá-lo.

Permissões (Portas Trancadas): Uma porta está trancada porque o jogador não tem permissão de leitura. Ele precisa usar chmod +x porta.sh ou chown para conseguir passar.

2. Validação por Sandbox Real (Docker)
O jogo se conecta a um shell real rodando em segundo plano (usando as estruturas contidas em levels/). Os comandos digitados no jogo são enviados para esse ambiente real, e o retorno do terminal altera o estado do jogo.

Isolamento de Recursos (Cgroups): Cada container de desafio é limitado a 0.5 de CPU e 256MB de Memória RAM para evitar travamentos acidentais em loops ou fork bombs.

Segurança do Host: Os containers não montam nenhuma pasta física do computador do jogador. Toda a interação e modificação de arquivos ocorrem exclusivamente em volumes efêmeros criados dentro do Docker através da escuta do barramento /var/run/docker.sock mapeado no container do orquestrador.

3. Sistema de Save Points (Persistência)
Para garantir que o jogador nunca perca o progresso de sua evolução:

Salva no Navegador/Engine: Gravação instantânea do progresso a cada nível concluído usando a API localStorage da engine/web, persistindo chaves como:

JSON
  {
    "player_name": "Ronaldo",
    "current_level": 21,
    "credits": 200,
    "completed_levels": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  }
Sincronização no Host: O orquestrador salva localmente os metadados no arquivo savegame.json dentro da pasta home do operador do jogo.

Restauração: O menu principal traz o botão "Continuar" que lê o estado de persistência, carrega o container Docker da fase salva e configura o prompt de comando.

4. Registro Interativo de Nome (Login Inicial)
Na primeira execução do jogo, o jogador passa por uma tela de login temática simulando um terminal clássico de Unix:

SYSTEM BOOT... OK
AURA-7 INITIALIZED (35% INTEGRITY)

[!] NO REGISTERED OPERATOR FOUND.
ENTER YOUR OPERATOR NAME: _
Assim que o jogador insere seu nome:

O prompt do console é customizado para [nome_do_jogador]@bunker-server:~$.

Os balões de chat da AURA-7 e as dicas reagem dinamicamente citando o nome do jogador.

Os e-mails de congratulação e contratação são endereçados diretamente ao nome cadastrado.

🛠️ PILHA DE TECNOLOGIA ATUAL DO REPOSITÓRIO (STACK)
Frontend App (root-access_-devops-chronicles): Aplicação Single Page Application (SPA) baseada em React 19, Vite, TypeScript e TailwindCSS v4, renderizando scanlines, consoles dinâmicos via Lucide React e componentes interativos alimentados pelo arquivo de desafios src/data/challenges.ts.

Orquestrador Back-End (orchestrator): Microsserviço construído em Python 3 (Flask/FastAPI local) rodando em container isolado exposto na porta 8000. Ele intercepta comandos da API web, builda os arquivos Dockerfiles de cada fase sob demanda e gerencia o ciclo de vida das instâncias do jogador.

Motor de Inteligência Local (Ollama): Barramento de inteligência artificial local rodando na porta 11434, configurado via arquivo .env.local (GEMINI_API_KEY=LOCAL_LLM_ACTIVE) para desviar as requisições para o modelo bunker-core (4.7 GB), simulando a personalidade cyberpunk da AURA-7 de forma totalmente gratuita e offline.
