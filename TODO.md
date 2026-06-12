# 📋 Backlog & Status Geral do Projeto (ROOT ACCESS)

Este documento resume a situação atual do projeto **ROOT ACCESS** e mapeia o que ainda precisa ser executado para o lançamento.

---

## 🛠️ O Que Foi Concluído
- [x] **Conteúdo do Jogo (Níveis 1 a 230)**: Todos os 14 módulos foram totalmente criados (briefings, setups, Dockerfiles e validadores nativos reais).
- [x] **Compilação de Dados**: O compilador em Python gerou com sucesso as definições de fases em TypeScript para o frontend React.
- [x] **Estrutura de Arquivos Organizada**: Todos os arquivos de documentação markdown de módulos (`modulo*.md` e `modulo*_roadmap.md`) foram organizados na pasta `docs/curriculum/`.
- [x] **Compilação e Build de Produção**: O projeto React/Vite compila com sucesso absoluto (`npm run build`).

---

## ⏳ O Que Resta Fazer (Backlog)

### 1. Testes de Gameplay Manuais (QA)
- [ ] Rodar o jogo localmente (`npm run dev` + orquestrador backend) e testar a resolução de pelo menos um nível por módulo.
- [ ] Checar se as respostas dos validadores nativos (no histórico de bash e no filesystem) estão respondendo sem lentidão excessiva.

### 2. Integração com Godot Engine
- [ ] Validar a ponte GDScript (`OrchestratorBridge.gd` em `docs/` ou na pasta do jogo) com a UI desenvolvida em Godot.
- [ ] Garantir o recebimento correto de payloads JSON do orquestrador local.

### 3. Internacionalização (i18n)
- [ ] Avaliar a viabilidade e escolher o design de tradução (Dual-language objects vs Separate generated bundles) para oferecer suporte a Português (Brasil) e Inglês (ver detalhes de viabilidade no relatório final).
- [ ] Implementar tradução da interface do terminal web e arquivos de briefings.

### 4. Deploy & Git
- [ ] Realizar revisão de segurança nos contêineres Docker gerados.
- [ ] Executar commit único e atômico e fazer o push para o repositório público.

---

## 🗺️ Localização da Documentação
*   **Especificações Curriculares (Fases)**: [docs/curriculum/](file:///mnt/dados/workspaces/Game%20HQ/docs/curriculum/)
*   **Roadmap Geral de Evolução**: [docs/roadmap.md](file:///mnt/dados/workspaces/Game%20HQ/docs/roadmap.md)
*   **Mapa Mental de Fluxo**: [docs/mapa_mental.md](file:///mnt/dados/workspaces/Game%20HQ/docs/mapa_mental.md)
*   **Plano de Projeto Completo**: [docs/Plano%20de%20projeto%20jogo%20interativo.md](file:///mnt/dados/workspaces/Game%20HQ/docs/Plano%20de%20projeto%20jogo%20interativo.md)
