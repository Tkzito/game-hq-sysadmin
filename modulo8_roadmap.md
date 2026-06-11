# 🗺️ Roadmap de Desenvolvimento: Módulo 8 (SRE e Cibersegurança Internacional)

Este documento rastreia a implementação e teste dos desafios do Módulo 8.

**Contexto Narrativo:** Consórcio EcoGrid Solar — monitoramento em tempo real de matrizes energéticas limpas, mitigação de DDoS cibernéticos e automação de alta disponibilidade e self-healing (Kubernetes/Clusterctl-like architecture).  
**Perfil do Jogador:** SRE Sênior e Especialista em Cibersegurança (Níveis 161 a 170)  
**Faixa de Níveis:** 161 a 170

---

## 1. Status de Desenvolvimento

| Nível | Título | Status | Validação (Docker) | Assets de Gameplay |
| :--- | :--- | :--- | :--- | :--- |
| Nível 161 | Infraestrutura Declarativa (Manifestos YAML) | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 162 | Auditoria de Nós de Produção (Integridade) | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 163 | Alta Disponibilidade e Escalonamento | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 164 | Reconciliação Contínua (Aplicação de Manifesto) | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 165 | Simulação de Failover Ativo | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 166 | Self-Healing (Auto-Recuperação) | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 167 | Análise Forense de Logs do Cluster | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 168 | Mitigação de Ataques DDoS | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 169 | Auditoria de Chaves SSH (Auditoria de Acessos) | ⏳ Planejado | ❌ Pendente | ❌ Pendente |
| Nível 170 | [Desafio Final: O Dia do Caos] | ⏳ Planejado | ❌ Pendente | ❌ Pendente |

---

## 2. Metas de Implementação
- [ ] Criar mock robusto de orquestração declarativa (motor python que interpreta o arquivo `deployment.yaml` e cria containers baseados no manifesto).
- [ ] Implementar gerador de tráfego artificial e logs de DDoS para o desafio do firewall.
- [ ] Criar validador de integridade e assinatura das chaves SSH em `/home/operator/.ssh/authorized_keys`.
- [ ] Mapear o painel final de SRE com painéis piscantes de incidentes em tempo real.
