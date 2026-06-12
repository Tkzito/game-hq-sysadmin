# 🧠 Mapa Mental: ROOT ACCESS - DevOps Chronicles

Este documento descreve detalhadamente o ecossistema do jogo, mapeando suas frentes tecnológicas, o fluxo de jogabilidade, o isolamento de infraestrutura e a integração entre as ferramentas.

---

## 1. Visão Geral do Ecossistema

O jogo opera sob um modelo híbrido onde a interface visual consome uma API local para interagir com sandboxes Docker reais.

```mermaid
graph TD
    A["Godot Engine / play.html (Front-End)"] -->|"Requisições de comandos e status (REST API)"| B["Orquestrador Python (API Local:8000)"]
    B -->|"docker run / exec / stop"| C["Docker Daemon (Host do Desenvolvedor)"]
    C -->|"Container Isolado (Alpine/Ubuntu)"| D["Ambiente Linux da Fase (Sandbox)"]
    D -->|"Histórico de Comandos (.bash_history)"| B
    D -->|"Telemetria (/tmp/status_sistema.txt)"| B
    B -->|"Dicas Baseadas em Estado"| E["IA AURA-7 (Simulada no JSON)"]
```

---

## 2. Pilares do Jogo

| Pilar | Descrição | Componentes |
| :--- | :--- | :--- |
| **Narrativa (A Alma)** | A história de um SysAdmin contratado por corporações e bunkers no submundo DevOps. | Quadrinhos de Introdução/Vitória, E-mails de Feedback e Carteira Virtual de Recompensas. |
| **Infraestrutura (O Corpo)** | Containers Docker leves e herméticos que simulam problemas reais de servidores em produção. | Dockerfiles, Mocks de Hardware/Processos e Scripts de Falha/Monitoramento. |
| **Validação (O Cérebro)** | Script inteligente em Python que intercepta e analisa o estado interno do container sem intervenção externa. | `orchestrator.py`, `.bash_history` do jogador, arquivos de telemetria local e validações de sucesso. |
| **IA AURA-7 (A Mentora)** | Um sistema de apoio baseado no progresso real do jogador, com dicas contextuais. | Árvore de diálogos em JSON, efeito typewriter no terminal e análise de histórico de comandos. |

---

## 3. Mapeamento da Campanha (8 Módulos - 170 Níveis)

```mermaid
gantt
    title Curva de Aprendizado e Módulos do ROOT ACCESS (170 Níveis)
    dateFormat  X
    axisFormat %d
    
    section Mod 1: Shell Básico & Autônomo
    Shell Scripting Completo (Nív 1-100) :active, m1, 0, 100
    
    section Mod 2: Segurança POSIX
    Permissões e Usuários (Nív 101-110) :active, m2, 100, 110
    
    section Mod 3: Telemetria
    Monitoramento de Processos (Nív 111-120) :active, m3, 110, 120
    
    section Mod 4: Redes
    Redes, DNS e SSH Remoto (Nív 121-130) :active, m4, 120, 130
    
    section Mod 5: Automação
    Scripts de Automação Avançada (Nív 131-140) :active, m5, 130, 140
 
    section Mod 6: Git & CI-CD
    Versionamento e Hooks de Deploy (Nív 141-150) :active, m6, 140, 150
 
    section Mod 7: Containers
    Docker e Orquestração Local (Nív 151-160) :active, m7, 150, 160
 
    section Mod 8: SRE & HA
    Resiliência, Failover e DDoS (Nív 161-170) :active, m10, 160, 170
```

---

## 4. Segurança e Políticas SRE
Como o jogo roda no notebook pessoal do desenvolvedor, a arquitetura foi planejada sob rígidas regras de segurança:

> [!IMPORTANT]
> **Isolamento de Recursos (Cgroups)**
> Cada container de desafio é limitado a **0.5 de CPU** e **256MB de Memória RAM** para evitar travamentos acidentais do notebook em caso de *fork bombs* ou loops de scripts.

> [!TIP]
> **Sem Bind Mounts do Host**
> Os containers não montam nenhuma pasta física do seu notebook. Toda a interação e modificação de arquivos ocorrem exclusivamente em volumes efêmeros criados dentro do Docker.

> [!CAUTION]
> **Privilégios Limitados**
> O usuário padrão do container é o `operator` (não-root). O uso de comandos administrativos (como `sudo`) é exigido nos desafios para simular permissões de segurança reais de produção.

