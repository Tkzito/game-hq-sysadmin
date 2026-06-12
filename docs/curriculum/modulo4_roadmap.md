# 🗺️ Roadmap de Desenvolvimento: Módulo 4 (Fundamentos de Redes e Acesso Remoto)

Este documento rastreia a implementação e teste dos desafios do Módulo 4.

**Contexto Narrativo:** Distribuidora São Luís — problemas de conectividade na filial de Caruaru com impacto direto em operações de logística.  
**Perfil do Jogador:** SysAdmin Júnior em transição para atendimento multi-cliente  
**Faixa de Níveis:** 121 a 130

---

## 1. Status de Desenvolvimento

| Nível | Título | Status | Validação (Docker) | Assets de Gameplay |
| :--- | :--- | :--- | :--- | :--- |
| Nível 121 | Verificando Interfaces de Rede: O Inventário do Que Existe | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 122 | Roteamento e Tabela de Rotas: Como os Pacotes Viajam | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 123 | Diagnóstico de Conectividade: A Prova de Vida da Rede | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 124 | Rastreamento de Pacotes: Seguindo a Trilha | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 125 | Resolução de Nomes e DNS: Traduzindo Endereços | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 126 | Download de Arquivos via Linha de Comando | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 127 | Conexão SSH Segura: O Túnel Criptografado | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 128 | Cópia Segura de Arquivos: Movendo Dados Remotamente | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 129 | Regras Básicas de Firewall com UFW | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |
| Nível 130 | [Desafio Integrado] O Filial Offline | ✅ Concluído | ✅ Disponível | ✔️ Mapeado |

---

## 2. Metas de Implementação

- [x] Criar imagem Docker para os desafios (`saoluis-network:broken` com rede simulada)
- [x] Escrever validadores Python para cada etapa do desafio integrado (nível 130)
- [x] Gerar assets visuais (prompts para Meta AI / Stable Diffusion)
- [x] Criar rede Docker interna com dois containers (matriz + filial) para simular ambiente real
- [x] Implementar servidor DNS fake com bind9 para simular falha de registro
- [x] Configurar UFW no container da filial com porta bloqueada como pré-condição do desafio

---

## 3. Especificações do Ambiente Docker

```yaml
# Ambiente: rede simulada saoluis
services:
  matriz:
    image: ubuntu:22.04
    packages: [iproute2, iputils-ping, traceroute, dnsutils, openssh-client, curl, wget, ufw]
    role: Ponto de trabalho do jogador

  filial-caruaru:
    image: ubuntu:22.04
    packages: [openssh-server, ufw, curl]
    pre-conditions:
      - UFW ativo com porta 8443 bloqueada
      - Serviço fake na porta 8443 rodando (sync service)
      - Log de erro em /var/log/sync.log

  dns-saoluis:
    image: internaldns/bind9
    pre-conditions:
      - Zona saoluis.local configurada
      - Registro A de filial-caruaru REMOVIDO (falha simulada)

networks:
  corp-network: 192.168.1.0/24 (matriz e DNS)
  filial-network: 192.168.2.0/24 (filial)
  internet-gateway: roteador entre redes
```

---

## 4. Critérios de Validação por Nível

| Nível | Critério de Aprovação |
| :--- | :--- |
| 121 | Aluno identifica corretamente IP, máscara CIDR e estado UP/DOWN das interfaces |
| 122 | Aluno identifica o gateway padrão na tabela de rotas |
| 123 | Aluno interpreta corretamente "Destination Host Unreachable" vs timeout |
| 124 | Aluno identifica o hop onde a conectividade é perdida via traceroute |
| 125 | Aluno identifica que o registro A está ausente no DNS via dig |
| 126 | Aluno baixa script via wget e testa endpoint via curl corretamente |
| 127 | Aluno conecta via SSH e configura ~/.ssh/config |
| 128 | Aluno copia log remoto para local via scp e envia script via rsync |
| 129 | Aluno configura UFW com regras específicas sem se trancar para fora |
| 130 | Todas as etapas concluídas; sync service respondendo HTTP 200 em tempo |

---

## 5. Assets Visuais Planejados

| Asset | Descrição | Status |
| :--- | :--- | :--- |
| `saoluis_warehouse.png` | Galpão da distribuidora com servidores rack e monitores de rastreamento | ✅ Disponível |
| `caruaru_filial.png` | Escritório da filial em Caruaru com rede caída (telas de erro) | ✅ Disponível |
| `network_topology.png` | Diagrama visual da topologia de rede da distribuidora | ✅ Disponível |
| `aura7_network.png` | AURA-7 analisando pacotes de rede com visualização de roteamento | ✅ Disponível |
| `badge_elo_da_rede.png` | Badge de conclusão do Módulo 4 | ✅ Disponível |

---

## 6. Notas de Design

- **Tom Narrativo:** Urgência de negócio — cada hora offline = R$ 40k de prejuízo (pressão financeira real)
- **Progressão de Dificuldade:** Diagnóstico local (121-124) → resolução de nomes (125-126) → acesso remoto (127-128) → segurança (129) → integração total (130)
- **Ponto de Tensão Máxima:** Desafio 130 tem prazo de 2h30 (14h32 → 17h00) com timer no HUD
- **Easter Egg:** Se o aluno usar `ufw allow any` em vez de regra específica, AURA-7 reprova e exige refazer: "Isso não é segurança. Isso é rendição."
- **Referência Técnica:** Alinhado com LPIC-1 tópico 109 (Fundamentos de Redes)
- **Dica de Progressão:** Após nível 127, AURA-7 menciona que no Módulo 6 aprenderemos a automatizar deploys via SSH com hooks Git
