# 🗺️ Roadmap de Desenvolvimento: Módulo 2 (Segurança & Permissões POSIX)

Este documento rastreia a implementação e teste dos desafios do Módulo 2.

---

## 1. Status de Desenvolvimento

| Nível | Título | Status | Validação (Docker) | Assets de Gameplay |
| :--- | :--- | :--- | :--- | :--- |
| Nível 101 | Quem Pode Ver o Quê? | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 102 | Destravando o Script do Caixa | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 103 | Blindagem Numérica | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 104 | Mudando de Dono | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 105 | O Grupo Financeiro | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 106 | O Novo Operador | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 107 | Acesso Restrito da Impressora | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 108 | Testando a Perspectiva | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 109 | A Impressora Teimosa | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 110 | [Desafio] A Constituição da Farmácia | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |

---

## 2. Metas de Implementação
- [x] Criar imagem Docker `pharmacy-security` com arquivos e grupos (`financeiro`, `caixas`) pré-configurados.
- [x] Escrever script de validação Python para inspecionar permissões de `/etc/sudoers` e chowns de arquivos.
