# ROOT ACCESS: DevOps Chronicles - Laboratório de Testes "Em Desenvolvimento, muitas atualizações seram feitas"

Bem-vindo ao repositório de desenvolvimento local do jogo **ROOT ACCESS: DevOps Chronicles**. Este diretório foi planejado para rodar de forma isolada no seu notebook de desenvolvimento, garantindo um ambiente hermético de aprendizado para futuros SysAdmins e SREs.

---

## 🛠️ Requisitos de Infraestrutura

Antes de iniciar os freelas, garanta que você possui instalado localmente:
1.  **Docker** (Daemon ativo e rodando).
2.  **Python 3** instalado no path global do sistema hospedeiro.

---

## 📁 Arquitetura do Projeto

```bash
├── assets/                  # Assets visuais (Imagens, GIFs, Vídeos) organizados
├── levels/                  # Configurações de container para cada capítulo
│   ├── level1/              # Batismo de Fogo (Bunker 7)
│   │   ├── Dockerfile       # Sandbox do Alpine Linux
│   │   └── ligar_coolers.sh # Script do desafio
│   └── level2/ a level5/    # Mocks estruturados das próximas fases
└── orchestrator/            # Orquestrador do jogo
    ├── game_config.json     # single source of truth (briefing, validações, dicas, recompensas)
    └── orchestrator.py      # CLI de gerenciamento do ciclo de vida dos containers
```

---

## 🚀 Guia de Operações (CLI)

O script `orchestrator.py` é a ferramenta utilizada para gerenciar as fases. Ele limita o consumo de recursos de cada desafio (máximo de **256MB de RAM** e **0.5 de CPU**) e isola os containers para não interferir na sua máquina física.

### 1. Listar Níveis Disponíveis
Para verificar o progresso, se as imagens já foram compiladas e se os containers estão ativos:
```bash
python3 orchestrator/orchestrator.py list
```

### 2. Compilar uma Imagem (Build)
Sempre compile a imagem de um capítulo antes de rodá-lo:
```bash
python3 orchestrator/orchestrator.py build 1
```

### 3. Iniciar um Capítulo
Carrega as informações do freela (briefing, cliente, severidade) e sobe o container isolado:
```bash
python3 orchestrator/orchestrator.py start 1
```

### 4. Acessar o Terminal do Desafio (Shell)
Derruba o jogador diretamente no terminal do container como o usuário comum `operator` para iniciar a resolução:
```bash
python3 orchestrator/orchestrator.py shell 1
```

### 5. Verificar a Solução (Check)
Para checar se você conseguiu solucionar o gargalo técnico e receber seu feedback narrativo (E-mail do cliente):
```bash
python3 orchestrator/orchestrator.py check 1
```

### 6. Obter Dicas / Pistas (Hint)
Se você ou o jogador travarem em um detalhe técnico, o orquestrador possui dicas nativas de SRE:
```bash
python3 orchestrator/orchestrator.py hint 1
```

### 7. Parar o Container Atual
Encerra a execução do container de um determinado nível:
```bash
python3 orchestrator/orchestrator.py stop 1
```

### 8. Limpar o Ambiente (Clean)
Para remover todos os containers e imagens de testes gerados pelo jogo e liberar espaço no seu notebook:
```bash
python3 orchestrator/orchestrator.py clean
```

---

## 🔒 Segurança e Isolamento

Este projeto segue padrões rígidos para garantir a segurança da máquina hospedeira do desenvolvedor:
*   **Sem Bind Mounts:** O container não possui acesso ao sistema de arquivos do seu notebook.
*   **Acesso Restrito:** O jogador opera sob um usuário comum (`operator`), precisando usar `sudo` para tarefas administrativas simuladas.
*   **Limites de Recursos:** Parâmetros de cgroups ativados para evitar *fork bombs* ou loops de CPU de travarem o sistema operacional host.
