# 🗺️ Roadmap de Desenvolvimento: Módulo 6 (Versionamento e Pipeline CI/CD)

Este documento rastreia a implementação e teste dos desafios do Módulo 6.

**Contexto Narrativo:** TechVanguard Fintech — infraestrutura de deploys manuais descontinuada em prol de automação, versionamento e barreiras de segurança de commits.  
**Perfil do Jogador:** DevOps Engineer (Níveis 141 a 150)  
**Faixa de Níveis:** 141 a 150

---

## 1. Status de Desenvolvimento

| Nível | Título | Status | Validação (Docker) | Assets de Gameplay |
| :--- | :--- | :--- | :--- | :--- |
| Nível 141 | O Primeiro Commit | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 142 | Rastreando e Salvando Alterações | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 143 | Bifurcando Caminhos (Branches) | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 144 | Mesclando Realidades (Merge) | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 145 | O Grande Conflito de Merge | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 146 | Conectando Repositórios Remotos | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 147 | O Guardião do Código (Hook pre-commit) | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 148 | Deploy Automatizado (Hook post-receive) | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 149 | Validação de Estrutura YAML (Linting) | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 150 | [Desafio Integrado] A Pipeline Inquebrável | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |

---

## 2. Metas de Implementação
- [x] Criar imagem Docker com ambiente Git configurado e suporte a SSH Server interno para testes locais.
- [x] Escrever validadores em Python para testar os Hooks Git locals (`pre-commit`) e remotos (`post-receive`).
- [x] Mapear assets visuais de pipelines de deploys e terminais de conflito para a interface React.
