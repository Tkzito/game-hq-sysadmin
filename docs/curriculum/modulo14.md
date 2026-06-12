# Módulo 14: Alta Disponibilidade de Bancos de Dados e Stateful Services
## Guia de Níveis (221 a 230) — Foco: Resiliência, replicações e failovers de bancos de dados

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

A TechVanguard não pode tolerar 1 segundo de perda de transação bancária. Bancos de dados de instância única são gargalos e pontos únicos de falha. Você deve clusterizar e replicar dados de forma resiliente.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 221 — Tuning de Banco PostgreSQL
- **Contexto:** Calcular e configurar parâmetros de memória e disco no postgresql.conf para suportar 500 conexões.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** shared_buffers, max_connections, work_mem em postgresql.conf
- **Diálogo AURA-7:** *"O PostgreSQL padrão vem configurado de forma conservadora. Ajustar o uso de memória acelera ordenações e leituras."*

---

#### Nível 222 — Replicação Física Assíncrona
- **Contexto:** Configurar réplicas físicas de leitura (Standby) no PostgreSQL copiando arquivos WAL a partir do nó primário.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** pg_basebackup, standby.signal, primary_conninfo
- **Diálogo AURA-7:** *"A replicação física garante uma cópia idêntica bit-a-bit dos dados no servidor réplica quase instantaneamente."*

---

#### Nível 223 — Balanceamento de Réplicas de Leitura
- **Contexto:** Configurar rotas de queries para balancear operações pesadas de relatórios apenas nos nós secundários de leitura.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** hot_standby = on, read-only replication routing
- **Diálogo AURA-7:** *"Direcionar queries pesadas de leitura para as réplicas poupa o nó master para focar apenas nas escritas."*

---

#### Nível 224 — Arquivamento WAL e Point-in-Time Recovery
- **Contexto:** Habilitar continuous archiving e recuperar a base de dados em um minuto específico do passado (PITR) após deleção acidental.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** restore_command, recovery_target_time, archive_command
- **Diálogo AURA-7:** *"O WAL archiving grava transações continuamente, permitindo voltar a base de dados a qualquer segundo do passado."*

---

#### Nível 225 — Pools de Conexões com PgBouncer
- **Contexto:** Configurar e iniciar o PgBouncer para interceptar e reaproveitar conexões TCP com o banco, reduzindo overhead de handshake.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** pgbouncer.ini, pool_mode = transaction, max_client_conn
- **Diálogo AURA-7:** *"Criar conexões no PostgreSQL é custoso. O PgBouncer mantem um pool aquecido, escalando o suporte para milhares de clientes."*

---

#### Nível 226 — Replicação Lógica de Tabelas
- **Contexto:** Configurar publicação e inscrição (pub/sub) lógicas para replicar apenas tabelas específicas entre bases de dados separadas.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** CREATE PUBLICATION, CREATE SUBSCRIPTION, logical replication
- **Diálogo AURA-7:** *"A replicação lógica replica linhas e transações de tabelas selecionadas, permitindo cruzar dados entre bancos distintos."*

---

#### Nível 227 — Cluster Redis e Redundância
- **Contexto:** Configurar replicações primário-secundário em chaves Redis para garantir a consistência do cache distribuído.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** redis.conf, replicaof master_ip master_port, redis-cli info replication
- **Diálogo AURA-7:** *"Redis sem replicação perde dados de cache em caso de reboot. Manter réplicas garante a persistência rápida."*

---

#### Nível 228 — Redis Sentinel para Failover Automático
- **Contexto:** Configurar Sentinels para monitorar e promover a réplica a primária automaticamente caso o nó master Redis caia.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** sentinel.conf, sentinel monitor mymaster, sentinel failover
- **Diálogo AURA-7:** *"Sentinel monitora o cluster Redis de forma distribuída, votando a promoção de um novo primário em segundos."*

---

#### Nível 229 — Backups e Dumps Físicos Seguros
- **Contexto:** Executar pg_dump e pg_restore de forma limpa e com compressão máxima de dados sem travar a escrita concorrente.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** pg_dump -Fc -j 4, pg_restore, --no-owner
- **Diálogo AURA-7:** *" dumps lógicos consistentes criam uma fotografia do banco e restauram o esquema em segundos sem travar locks de escrita."*

---

#### Nível 230 — [Desafio Final Integrado] O Failover do Cluster
- **Contexto:** Gerenciar uma falha real de queda do PostgreSQL primário: promover manualmente a réplica saudável e chavear o PgBouncer.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** Todos do módulo
- **Diálogo AURA-7:** *"Cluster promovido com sucesso. Os dados da TechVanguard continuam seguros, consistentes e com zero downtime!"*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Comando Principal | Dificuldade |
|:------|:-------|:------------------|:-----------|
| 221 | Tuning de Banco PostgreSQL | `shared_buffers` | easy |
| 222 | Replicação Física Assíncrona | `pg_basebackup` | easy |
| 223 | Balanceamento de Réplicas de Leitura | `hot_standby = on` | easy |
| 224 | Arquivamento WAL e Point-in-Time Recovery | `restore_command` | medium |
| 225 | Pools de Conexões com PgBouncer | `pgbouncer.ini` | medium |
| 226 | Replicação Lógica de Tabelas | `CREATE PUBLICATION` | medium |
| 227 | Cluster Redis e Redundância | `redis.conf` | medium |
| 228 | Redis Sentinel para Failover Automático | `sentinel.conf` | hard |
| 229 | Backups e Dumps Físicos Seguros | `pg_dump -Fc -j 4` | hard |
| 230 | [Desafio Final Integrado] O Failover do Cluster | `Todos do módulo` | legendary |
