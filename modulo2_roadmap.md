# 🗺️ Roadmap de Desenvolvimento: Módulo 2 (Segurança & Permissões POSIX)

Este documento rastreia a implementação e teste dos desafios do Módulo 2.

---

## 1. Status de Desenvolvimento

| Nível | Título | Status | Validação (Docker) | Assets de Gameplay |
| :--- | :--- | :--- | :--- | :--- |
| Nível 101 | Quem Pode Ver o Quê? | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 102 | Destravando o Script do Caixa | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 103 | Blindagem Numérica | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 104 | Mudando de Dono | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 105 | O Grupo Financeiro | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 106 | O Novo Operador | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 107 | Acesso Restrito da Impressora | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 108 | Testando a Perspectiva | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 109 | A Impressora Teimosa | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 110 | [Desafio] A Constituição da Farmácia | ⏳ Planejado | ❌ Pendente | ❌ Pendente |

---

## 2. Metas de Implementação
- [ ] Criar imagem Docker `pharmacy-security` com arquivos e grupos (`financeiro`, `caixas`) pré-configurados.
- [ ] Escrever script de validação Python para inspecionar permissões de `/etc/sudoers` e chowns de arquivos.
