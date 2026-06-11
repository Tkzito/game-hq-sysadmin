# 🗺️ Roadmap de Desenvolvimento: Módulo 3 (Monitoramento de Processos e Recursos)

Este documento rastreia a implementação e teste dos desafios do Módulo 3.

**Contexto Narrativo:** Clínica OralTech — migração de Windows para Linux, servidores lentos com travamentos periódicos.  
**Perfil do Jogador:** SysAdmin Júnior (chegando do Módulo 2)  
**Faixa de Níveis:** 111 a 120

---

## 1. Status de Desenvolvimento

| Nível | Título | Status | Validação (Docker) | Assets de Gameplay |
| :--- | :--- | :--- | :--- | :--- |
| Nível 111 | Processos em Execução: Quem Está Rodando Aqui? | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 112 | Monitoramento Interativo com htop | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 113 | Enviando Sinais a Processos: A Arte de Encerrar com Elegância | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 114 | Verificando Consumo de Memória: O que a RAM Esconde | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 115 | Uso de Disco por Partição: Mapeando o Território | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 116 | Identificando os Maiores Consumidores de Espaço | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 117 | Jobs em Background: Multitarefa no Terminal | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 118 | Rastreando Arquivos Abertos por Processo | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 119 | Prioridade de Execução: Quem Passa na Frente | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 120 | [Desafio Integrado] O Servidor da Clínica | ⏳ Planejado | ❌ Pendente | ❌ Pendente |

---

## 2. Metas de Implementação

- [ ] Criar imagem Docker para os desafios (`oraltech-server:broken` com load simulado)
- [ ] Escrever validadores Python para cada etapa do desafio integrado (nível 120)
- [ ] Gerar assets visuais (prompts para Meta AI / Stable Diffusion)
- [ ] Criar script de setup que simula servidor doente (processo CPU hog + disco cheio + swap alto)
- [ ] Implementar sistema de dica progressiva (AURA-7 sugere próximo passo após 60s de inatividade)
- [ ] Criar banco de dados de processos fictícios da OralTech (`radiologia_sync`, `dental_agenda`, `backup_dicom`)

---

## 3. Especificações do Ambiente Docker

```yaml
# Ambiente: oraltech-server
image: ubuntu:22.04
packages:
  - htop
  - lsof
  - procps
  - util-linux
simulation:
  - processo_cpu_hog: yes2 rodando em loop (simula radiologia_sync)
  - log_gigante: arquivo de 15GB em /var/log/radiologia_sync.log
  - swap_ativo: swapfile de 512MB pré-criado e parcialmente usado
  - disco_cheio: partição /var com 97% de uso
```

---

## 4. Critérios de Validação por Nível

| Nível | Critério de Aprovação |
| :--- | :--- |
| 111 | Aluno executa `ps aux` e identifica corretamente o PID com maior %CPU |
| 112 | Aluno ordena por CPU no htop e lê o load average corretamente |
| 113 | Aluno envia SIGTERM ao processo correto; se necessário, usa SIGKILL |
| 114 | Aluno lê `free -h` e identifica que available < 10% da RAM total |
| 115 | Aluno identifica `/var` como partição com 97% de uso via `df -h` |
| 116 | Aluno localiza `/var/log/radiologia_sync.log` como maior arquivo |
| 117 | Aluno coloca backup em background com `nohup` e retorna ao terminal |
| 118 | Aluno usa `lsof -p PID` e identifica acesso indevido a prontuários |
| 119 | Aluno aplica `renice +19` ao processo de backup |
| 120 | Todas as etapas concluídas; load < 1.5, swap < 50%, disk +2GB livres |

---

## 5. Assets Visuais Planejados

| Asset | Descrição | Status |
| :--- | :--- | :--- |
| `oraltech_reception.png` | Hall de recepção da clínica com monitores exibindo erro | ❌ Pendente |
| `aura7_diagnostic.png` | AURA-7 em modo de análise com gráficos de CPU | ❌ Pendente |
| `server_room_clinic.png` | Sala de servidores em rack da clínica odontológica | ❌ Pendente |
| `htop_oraltech.png` | Screenshot simulado do htop com dados da OralTech | ❌ Pendente |
| `badge_medico_servidores.png` | Badge de conclusão do Módulo 3 | ❌ Pendente |

---

## 6. Notas de Design

- **Tom Narrativo:** Urgência clínica — cada minuto de downtime = pacientes sem atendimento
- **Progressão de Dificuldade:** Níveis 111-116 ensinam ferramentas isoladas; 117-119 combinam conceitos; 120 é síntese total
- **Ponto de Tensão Máxima:** Nível 120 tem contador regressivo de 15 minutos para aumentar adrenalina
- **Easter Egg:** Se o aluno deletar o log do dia atual (proibido), AURA-7 avisa sobre problema de auditoria LGPD
- **Referência Técnica:** Todo conteúdo alinhado com objetivos da certificação LPIC-1 (tópico 103.5, 104.2)
