# 🗺️ Roadmap de Evolução: ROOT ACCESS - DevOps Chronicles

Este documento descreve o estado atual do desenvolvimento do jogo e define a **Regra de Sincronização** para manter toda a documentação atualizada conforme progredimos.

---

## 1. Estado Atual do Projeto

| Componente / Fase / Módulo | Status | Descrição |
| :--- | :--- | :--- |
| **Orquestrador Python (`orchestrator.py`)** | ✅ Concluído | Controle de containers Docker local, limites de CPU/Memória, validações e Servidor HTTP API integrado. |
| **Ponte Godot (`OrchestratorBridge.gd`)** | ✅ Concluído | Script GDScript pronto para conectar a Godot Engine ao Orquestrador Python. |
| **Interface Web (`index.html`)** | ✅ Concluído | Painel interativo React/Vite completo, navegação integrada (Home/Levels/GitHub), suporte i18n total, terminal sandbox, editor nano e animações em tela cheia com botão de pular. |
| **Módulo 1: O Despertar do Shell (Níveis 1-100)** | ✅ Concluído | Curso Completo de Shell Script (10 submódulos de 10 níveis). Foco em preparar o jogador como autônomo local e para certificações (LPIC-1/LFCS). |
| **Módulo 2: Permissões, Usuários e Segurança POSIX (Níveis 101-110)** | ✅ Concluído | Gestão de privilégios, chmod octal/simbólico, chown, sudoers delegados e contas isoladas. |
| **Módulo 3: Monitoramento de Processos e Recursos (Níveis 111-120)** | ✅ Concluído | Gestão de sinais (SIGTERM/SIGKILL), htop, consumo de RAM, swap, disco e jobs em background. |
| **Módulo 4: Fundamentos de Redes e Acesso Remoto (Níveis 121-130)** | ✅ Concluído | Configurações de interfaces de rede, tabelas de rotas, DNS (dig/nslookup), SSH, SCP e firewall (UFW). |
| **Módulo 5: Automação e Shell Scripting Avançado (Níveis 131-140)** | ✅ Concluído | Estrutura de automação com loops (for/while), condicionais de arquivos, crontab, logs de execução e healthchecks. |
| **Módulo 6: Versionamento e Pipeline CI/CD (Níveis 141-150)** | ✅ Concluído | Fluxo de git (commits, branches, merges, conflitos) e automação de deploys usando Git Hooks. |
| **Módulo 7: Conteinerização e Orquestração Local (Níveis 151-160)** | ✅ Concluído | Gerenciamento de imagens e containers Docker, criação de Dockerfiles customizados, volumes e Compose. |
| **Módulo 8: SRE e Cibersegurança Internacional (Níveis 161-170)** | ✅ Concluído | Infraestrutura declarativa, auto-recuperação (self-healing), failover, mitigação de DDoS e auditoria forense. |
| **Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS (Níveis 171-180)** | ✅ Concluído | Configuração avançada de Nginx, proxy reverso, load balancing, SSL/TLS Let's Encrypt e rate limit. |
| **Módulo 10: Infraestrutura como Código (IaC) com Terraform (Níveis 181-190)** | ✅ Concluído | Declaração de infra, gerenciamento de estado (state files), módulos, backends remotos e locks. |
| **Módulo 11: Provisionamento e Gerenciamento com Ansible (Níveis 191-200)** | ✅ Concluído | Inventários, ad-hoc, playbooks idempotentes, roles, Ansible Vault, loops, templates e handlers. |
| **Módulo 12: Arquitetura de Nuvem Pública (AWS) (Níveis 201-210)** | ✅ Concluído | Provisionamento de VPC, subnets, EC2, S3, IAM, CloudFront, Route 53 e Auto Scaling. |
| **Módulo 13: Observabilidade, Métricas e Dashboards (Níveis 211-220)** | ✅ Concluído | Instrumentação com Prometheus/Grafana, queries PromQL, alertas, Grafana Loki para logs e Jaeger para traces. |
| **Módulo 14: Alta Disponibilidade de Bancos de Dados e Stateful Services (Níveis 221-230)** | ✅ Concluído | Tuning PostgreSQL, replicação física/lógica, failover de banco, PgBouncer, Redis Sentinel e dumps compactados. |
 
 ---
 
 ## 2. Protocolo de Sincronização do Projeto (A Regra)
 
 Para evitar que a documentação fique defasada em relação ao código e aos assets físicos do jogo, estabelecemos a seguinte **Regra de Atualização Obrigatória** a cada ciclo de desenvolvimento:
 
 ```mermaid
 graph TD
     A["Nova Feature / Fase Desenvolvida"] --> B["1. Atualizar código (Docker/Python/HTML)"]
     B --> C["2. Atualizar roadmap.md (Atualizar tabela de progresso e próximos passos)"]
     C --> D["3. Atualizar mapa_mental.md (Atualizar diagramas e pilares se houver mudanças de fluxo)"]
     D --> E["4. Atualizar Plano de projeto jogo interativo.md (Refletir logs de alteração e documentar novos diálogos/especificações)"]
 ```
 
 ### O que atualizar em cada arquivo:
 1.  **`roadmap.md`**: Atualizar a tabela de estados (Pendente ➔ Em Desenvolvimento ➔ Concluído) e anexar melhorias realizadas.
 2.  **`mapa_mental.md`**: Atualizar os diagramas Mermaid (fluxo de rede ou campanha) se novas tecnologias forem introduzidas.
 3.  **`Plano de projeto jogo interativo.md`**: Registrar a evolução técnica, novos comandos de validação e a expansão dos roteiros de diálogos com a IA.
 
 ---
 
 ## 🚀 Próximas Etapas e Pendências
 - Realizar rodadas de testes manuais adicionais de jogabilidade diretamente na URL pública.
 - Continuar adicionando novos submódulos e desafios conforme o feedback dos jogadores.

