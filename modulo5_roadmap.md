# 🗺️ Roadmap de Desenvolvimento: Módulo 5 (Automação e Shell Scripting Avançado)

Este documento rastreia a implementação e teste dos desafios do Módulo 5.

**Contexto Narrativo:** FreshBox Delivery — startup em crescimento acelerado que precisa automatizar tarefas manuais repetitivas que consomem horas do time de infra.  
**Perfil do Jogador:** DevOps Jr (chegando do Módulo 4)  
**Faixa de Níveis:** 131 a 140

---

## 1. Status de Desenvolvimento

| Nível | Título | Status | Validação (Docker) | Assets de Gameplay |
| :--- | :--- | :--- | :--- | :--- |
| Nível 131 | Loops em Lista Estática: A Primeira Repetição | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 132 | Loops em Arquivos e Saída de Comandos | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 133 | Loops Condicionais: Esperando que Algo Aconteça | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 134 | Condicionais Avançadas: Verificando o Mundo ao Redor | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 135 | Funções Modulares Reutilizáveis | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 136 | Arrays em Bash: Listas com Superpoderes | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 137 | Agendamento de Tarefas com Cron | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 138 | Logs Automáticos: Registrando o que Aconteceu | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 139 | Healthcheck com Restart Automático | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 140 | [Desafio Integrado] O Automatizador do FreshBox | ⏳ Planejado | ❌ Pendente | ❌ Pendente |

---

## 2. Metas de Implementação

- [ ] Criar imagem Docker para os desafios (`freshbox-scripting:env` com bash + ferramentas)
- [ ] Escrever validadores Python para o desafio integrado (nível 140)
- [ ] Gerar assets visuais (prompts para Meta AI / Stable Diffusion)
- [ ] Criar ambiente de simulação com serviços fake que respondem e falham controladamente
- [ ] Implementar validador de scripts bash (shellcheck integrado ao validador)
- [ ] Criar biblioteca de funções de referência para os alunos consultarem

---

## 3. Especificações do Ambiente Docker

```yaml
# Ambiente: freshbox-scripting
image: ubuntu:22.04
packages:
  - bash
  - curl
  - cron
  - logrotate
  - shellcheck
  - jq
simulation:
  - fake_api: servidor HTTP simples em Python que responde /health
  - failure_mode: variável de ambiente que simula falha quando definida
  - systemctl_mock: mock do systemctl para ambientes sem systemd
  - cron_active: crond rodando dentro do container
directories:
  - /opt/freshbox/: scripts do aluno
  - /var/log/freshbox/: logs gerados
  - /tmp/freshbox_state/: arquivos de estado
```

---

## 4. Critérios de Validação por Nível

| Nível | Critério de Aprovação |
| :--- | :--- |
| 131 | Script itera corretamente pelos 3 servidores via SSH e exibe resultado de cada um |
| 132 | Script comprime todos os `.log` mais antigos que 1 dia sem quebrar em nomes com espaço |
| 133 | Loop aguarda serviço disponível e implementa timeout máximo de 60s |
| 134 | Script verifica existência de arquivo, diretório e permissão antes de operar |
| 135 | Funções são modulares, usam `local` para variáveis e retornam exit codes corretos |
| 136 | Arrays iteram sem quebrar; associativo mapeia serviço → porta corretamente |
| 137 | Crontab com expressão correta verificada por parser; PATH absoluto nos scripts |
| 138 | Log gerado com timestamp ISO; logrotate configurado para 30 dias com compressão |
| 139 | Script detecta falha, tenta restart e emite alerta após falha confirmada |
| 140 | Sistema completo: array de endpoints, retry, contador de falhas, alertas, cron, logrotate |

---

## 5. Assets Visuais Planejados

| Asset | Descrição | Status |
| :--- | :--- | :--- |
| `freshbox_office.png` | Escritório moderno da startup FreshBox com telas de dashboard | ❌ Pendente |
| `aura7_coding.png` | AURA-7 em modo de codificação com hologramas de código bash | ❌ Pendente |
| `script_flowchart.png` | Fluxograma visual do script de healthcheck do nível 140 | ❌ Pendente |
| `cron_timeline.png` | Linha do tempo visual mostrando execuções do cron | ❌ Pendente |
| `badge_arquiteto_automacao.png` | Badge de conclusão do Módulo 5 | ❌ Pendente |

---

## 6. Notas de Design

- **Tom Narrativo:** Startup energia alta — senso de crescimento e urgência positiva
- **Progressão de Dificuldade:** Conceitos isolados (131-136) → aplicação ao sistema real (137-139) → integração total (140)
- **Scaffolding:** Níveis 131-133 fornecem template de código; 134-136 guia com comentários; 137-140 aluno escreve do zero
- **Ponto de Aprendizado Crítico:** Nível 137 — armadilha do PATH do cron é deliberadamente deixada para o aluno descobrir e corrigir
- **Easter Egg:** Se o script do nível 140 usar `curl URL | bash`, AURA-7 emite alerta de segurança e marca como "vulnerabilidade de supply chain"
- **ShellCheck Integration:** Todos os scripts do aluno passam por `shellcheck` antes de serem aceitos — erros comuns são sinalizados com dicas
- **Referência Técnica:** Alinhado com LPIC-1 tópico 105 (Shell, Scripting e Data Management)
