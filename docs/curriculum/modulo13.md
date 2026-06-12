# Módulo 13: Observabilidade, Métricas e Dashboards
## Guia de Níveis (211 a 220) — Foco: Métricas distribuídas, análise de performance e logs centralizados

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

No Consórcio EcoGrid Solar, as falhas nos microcontroladores ocorrem de forma assíncrona. Sem coleta centralizada e monitoramento contínuo, a equipe trabalha às cegas. Você deve implantar e integrar a pilha Prometheus e Grafana.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 211 — Instrumentação e Coleta Prometheus
- **Contexto:** Instalar e configurar o arquivo prometheus.yml para coletar métricas a partir do Node Exporter em 3 servidores.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** prometheus, prometheus.yml, scrape_configs, node_exporter
- **Diálogo AURA-7:** *"O Prometheus usa arquitetura pull, batendo em intervalos regulares no endpoint /metrics para raspar dados."*

---

#### Nível 212 — Consultas de Tráfego com PromQL
- **Contexto:** Escrever queries em PromQL para calcular o load average percentual, consumo de CPU e taxa de erros HTTP.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** rate(http_requests_total[5m]), sum by(status), irate
- **Diálogo AURA-7:** *"PromQL é a linguagem de consulta do Prometheus. rate() e sum() filtram e agregam logs de tráfego de rede."*

---

#### Nível 213 — Integração e Dashboards no Grafana
- **Contexto:** Mapear o Prometheus como DataSource no Grafana e criar um painel dinâmico de consumo de hardware.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** grafana-server, datasource integration, panel graphs
- **Diálogo AURA-7:** *"Grafana transforma números em visualizações ricas. Dashboards facilitam o trabalho de monitoramento em tempo real."*

---

#### Nível 214 — Alertas no Alertmanager
- **Contexto:** Definir regras de alertas no Prometheus para disparar emails caso o disco chegue a 90% por mais de 5 minutos.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** alertmanager, alert: DiskSpaceRunningLow, expr: df_used_percent > 90
- **Diálogo AURA-7:** *"Alertmanager agrupa e filtra alertas, silenciando ruídos repetitivos para evitar a fadiga de alertas no time."*

---

#### Nível 215 — Logs Centralizados com Grafana Loki
- **Contexto:** Configurar agentes do Promtail para ler e enviar logs dos servidores de banco de dados para o servidor Loki.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** loki, promtail, logql query, {} |= "error"
- **Diálogo AURA-7:** *"Loki é como o Prometheus, mas para logs. Indexa metadados mantendo a indexação leve e as consultas velozes."*

---

#### Nível 216 — Monitoramento Externo (Blackbox Exporter)
- **Contexto:** Configurar o Blackbox Exporter para testar externamente a latência TCP e HTTP dos portais dos clientes.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** blackbox_exporter, probe_http_status_code
- **Diálogo AURA-7:** *"O monitoramento de caixa-preta testa a aplicação de fora para dentro, simulando o acesso do cliente real."*

---

#### Nível 217 — Rastreamento Distribuído (Jaeger)
- **Contexto:** Analisar traces e spans de requisições no Jaeger para localizar qual microserviço está gargalando o sistema de pagamentos.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** jaeger, spans, traces, context propagation
- **Diálogo AURA-7:** *"Traces mostram o caminho de uma requisição de API por múltiplos servidores. Crucial para rastrear gargalos assíncronos."*

---

#### Nível 218 — Métricas de Performance da JVM/Runtime
- **Contexto:** Habilitar e analisar estatísticas internas de Garbage Collector e threads de runtime usando exports dedicados.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** jmx_exporter, gc_collection_time_seconds
- **Diálogo AURA-7:** *"Gargalos internos como paradas de Garbage Collector podem paralisar a execução sem acusar consumo de CPU externo."*

---

#### Nível 219 — Profiles Contínuos (Pyroscope)
- **Contexto:** Inspecionar chamas de execução (flamegraphs) para localizar qual linha exata de código está causando overhead.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** pyroscope, flamegraphs, CPU profiling
- **Diálogo AURA-7:** *"Profiling contínuo mostra exatamente as funções de código que mais gastam CPU, orientando refatorações."*

---

#### Nível 220 — [Desafio Integrado] O Centro de Operações (NOC)
- **Contexto:** Restaurar a monitoração de produção após o servidor Grafana perder chaves de integração, logs de erro Loki caírem e o Alertmanager parar.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** Todos do módulo
- **Diálogo AURA-7:** *"Métricas e painéis restabelecidos. O centro de operações está monitorando e alertando com precisão!"*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Comando Principal | Dificuldade |
|:------|:-------|:------------------|:-----------|
| 211 | Instrumentação e Coleta Prometheus | `prometheus` | easy |
| 212 | Consultas de Tráfego com PromQL | `rate(http_requests_total[5m])` | easy |
| 213 | Integração e Dashboards no Grafana | `grafana-server` | easy |
| 214 | Alertas no Alertmanager | `alertmanager` | medium |
| 215 | Logs Centralizados com Grafana Loki | `loki` | medium |
| 216 | Monitoramento Externo (Blackbox Exporter) | `blackbox_exporter` | medium |
| 217 | Rastreamento Distribuído (Jaeger) | `jaeger` | medium |
| 218 | Métricas de Performance da JVM/Runtime | `jmx_exporter` | hard |
| 219 | Profiles Contínuos (Pyroscope) | `pyroscope` | hard |
| 220 | [Desafio Integrado] O Centro de Operações (NOC) | `Todos do módulo` | hard |
