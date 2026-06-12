import os

WORKSPACE_DIR = "/mnt/dados/workspaces/Game HQ"

modules_spec = {
    9: {
        "title": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
        "levels_range": "171 a 180",
        "focus": "Configuração da infraestrutura de entrega da TechVanguard",
        "narrative": "Nova Recife, 2047. O tráfego na fintech TechVanguard explodiu após a nova rodada de investimentos. O servidor web antigo está caindo sob o peso de milhares de requisições de transferências pix. O gestor de TI te colocou na linha de frente para implantar Nginx de produção, gerenciar rotas de proxy reverso, balancear cargas e blindar com criptografia SSL.",
        "levels": {
            171: {
                "title": "Nginx como Servidor Web",
                "context": "Configurar o Nginx para servir a página estática de landing page da fintech na porta padrão.",
                "cmd": "nginx, systemctl start nginx, /etc/nginx/nginx.conf",
                "aura": "A instalação padrão do Nginx coloca o arquivo de boas-vindas. Vamos limpar a configuração para servir nossa aplicação."
            },
            172: {
                "title": "Proxy Reverso para APIs",
                "context": "Configurar o Nginx para encaminhar requisições do endpoint /api para a porta 8080 onde a API de pagamentos está rodando.",
                "cmd": "proxy_pass, location /api/ {}",
                "aura": "Nunca exponha as portas das APIs diretamente. O Nginx na frente atua como escudo e otimiza a latência."
            },
            173: {
                "title": "Balanceamento de Carga (Load Balancing)",
                "context": "Adicionar dois servidores redundantes no bloco upstream do Nginx para balancear as requisições de pix.",
                "cmd": "upstream, server ip:port, round-robin",
                "aura": "Se o servidor A cair ou ficar sobrecarregado, o Nginx encaminhará a requisição para o servidor B instantaneamente."
            },
            174: {
                "title": "Otimização de Entrega e Cache",
                "context": "Configurar diretivas de cache de arquivos estáticos (.js, .css, imagens) para aliviar o processamento do backend.",
                "cmd": "expires max, add_header Cache-Control",
                "aura": "O melhor processamento é aquele que não precisa ser executado. O cache local poupa bateria e banda."
            },
            175: {
                "title": "Headers de Segurança HTTP",
                "context": "Configurar cabeçalhos de segurança (CORS, HSTS e bloqueio de iframes) no Nginx para evitar ataques de injeção e clickjacking.",
                "cmd": "add_header X-Frame-Options DENY, add_header Strict-Transport-Security",
                "aura": "Headers corretos instruem os navegadores modernos a travarem requisições inseguras na origem."
            },
            176: {
                "title": "Limitação de Taxa de Requisições (Rate Limiting)",
                "context": "Configurar limit_req no Nginx para evitar brute-force e ataques de negação de serviço na rota de login.",
                "cmd": "limit_req_zone, limit_req zone=one burst=5",
                "aura": "Se um robô tentar bater 100 requisições por segundo na rota de login, o Nginx responderá 429 sem encostar na API."
            },
            177: {
                "title": "Instalação de Certificados SSL/TLS com Certbot",
                "context": "Obter e associar chaves SSL automáticas para o domínio usando o utilitário certbot.",
                "cmd": "certbot --nginx -d dominio.com, certbot renew --dry-run",
                "aura": "A Web moderna exige criptografia HTTPS. O Certbot interage com a Let's Encrypt para emitir certificados em 5 segundos."
            },
            178: {
                "title": "Cifras Criptográficas Robustas",
                "context": "Configurar cifras de TLS 1.3 seguras e desativar versões legadas como TLS 1.0 e 1.1.",
                "cmd": "ssl_protocols TLSv1.2 TLSv1.3, ssl_ciphers",
                "aura": "Manter protocolos antigos expõe a transação a ataques de downgrade. Blindagem máxima exige TLS 1.3."
            },
            179: {
                "title": "Virtual Hosts e Múltiplos Domínios",
                "context": "Configurar dois blocos 'server {}' diferentes para responder a api.tech.local e app.tech.local na mesma porta.",
                "cmd": "server_name, listen 80, listen 443",
                "aura": "Os Server Blocks do Nginx permitem consolidar múltiplos serviços no mesmo servidor mantendo isolamento completo."
            },
            180: {
                "title": "[Desafio Integrado] O Gateway de Produção",
                "context": "Configurar do zero o arquivo nginx.conf integrando proxy reverso para a API, HTTPS blindado, rate limiting e cabeçalhos de segurança.",
                "cmd": "Todos do módulo",
                "aura": "O tráfego de pagamentos está protegido. O Nginx está roteando, balanceando e criptografando perfeitamente. Trabalho brilhante."
            }
        }
    },
    10: {
        "title": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
        "levels_range": "181 a 190",
        "focus": "Provisionamento automático de infraestrutura na nuvem",
        "narrative": "A fintech TechVanguard está migrando toda a infraestrutura física para a Nuvem. Criar servidores clicando no painel gera drifts e inconsistências. Você deve automatizar todo o ciclo de vida dos servidores escrevendo código declarativo e imutável com Terraform.",
        "levels": {
            181: {
                "title": "Sintaxe HCL e Inicialização",
                "context": "Declarar o provider AWS no Terraform e inicializar o diretório de trabalho baixando os plugins correspondentes.",
                "cmd": "terraform init, provider \"aws\" {}",
                "aura": "O Terraform usa HCL (HashiCorp Configuration Language). O comando init baixa os drivers e conecta ao ecossistema da nuvem."
            },
            182: {
                "title": "Provisionando Recursos Básicos",
                "context": "Declarar e aplicar a criação de uma instância compute leve (EC2) e um volume de disco associado.",
                "cmd": "terraform plan, terraform apply, resource \"aws_instance\" \"web\"",
                "aura": "O plan mostra o que vai acontecer. O apply executa as chamadas de API reais. É infraestrutura declarada em código."
            },
            183: {
                "title": "Gerenciamento de State Files",
                "context": "Inspecionar o arquivo terraform.tfstate e ler o estado atual do recurso provisionado.",
                "cmd": "terraform show, terraform state list, terraform.tfstate",
                "aura": "O arquivo de estado é a fonte de verdade do Terraform. Nunca edite esse arquivo JSON manualmente."
            },
            184: {
                "title": "Modularização de Código",
                "context": "Criar sub-módulos reutilizáveis na pasta modules/ para isolar a rede dos servidores compute.",
                "cmd": "module \"vpc\" { source = \"./modules/vpc\" }",
                "aura": "Isolar lógica em módulos reaproveitáveis evita duplicação de código e padroniza a segurança."
            },
            185: {
                "title": "Variáveis e Outputs Dinâmicos",
                "context": "Declarar variáveis de entrada (região, tipo de instância) e exportar o IP público criado através de outputs.",
                "cmd": "variable \"region\" {}, output \"public_ip\" {}",
                "aura": "Variáveis tornam o código flexível para staging e produção. Outputs facilitam a integração em pipelines."
            },
            186: {
                "title": "Resolução de Configuration Drift",
                "context": "Corrigir e sincronizar o Terraform após um operador deletar manualmente um disco no painel da AWS.",
                "cmd": "terraform refresh, terraform plan, terraform import",
                "aura": "Qualquer alteração manual causa desvio. O refresh força o código a re-ler o estado e propor a recriação automática."
            },
            187: {
                "title": "Backends Remotos e Locks",
                "context": "Configurar o Terraform para salvar o arquivo de estado em um bucket S3 remoto com trava de concorrência no DynamoDB.",
                "cmd": "backend \"s3\" {}, dynamodb_table",
                "aura": "Salvar o estado localmente impede o trabalho em equipe. Backends remotos com locks previnem conflitos de escrita."
            },
            188: {
                "title": "Dependências de Recursos e Lifecycle",
                "context": "Configurar regras de ciclo de vida para criar recursos novos antes de destruir os antigos (create_before_destroy).",
                "cmd": "lifecycle { create_before_destroy = true }, depends_on",
                "aura": "Controlar a ordem de criação previne quedas (downtime). O depends_on força a rede a subir antes do servidor."
            },
            189: {
                "title": "Linters e Análise de Segurança de IaC",
                "context": "Rodar tflint e tfsec no código para identificar portas abertas e permissões excessivas antes do deploy.",
                "cmd": "tflint, tfsec, terraform validate",
                "aura": "Validadores estáticos bloqueiam chaves expostas e configurações de rede abertas na internet antes que cheguem à produção."
            },
            190: {
                "title": "[Desafio Integrado] O Provisionador Declarativo",
                "context": "Provisionar uma infraestrutura completa composta de VPC, subnets, e instâncias de computação isoladas usando módulos e backend seguro.",
                "cmd": "Todos do módulo",
                "aura": "A infraestrutura inteira da TechVanguard foi criada em 45 segundos. Código aprovado e versionado de forma robusta."
            }
        }
    },
    11: {
        "title": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
        "levels_range": "191 a 200",
        "focus": "Configuração automática e idempotente de servidores em escala",
        "narrative": "Com dezenas de servidores criados na nuvem, acessá-los individualmente via SSH para instalar atualizações é impraticável. Você deve utilizar o Ansible para declarar a configuração desejada e aplicá-la em lote de forma idêntica.",
        "levels": {
            191: {
                "title": "Inventários e Comandos Ad-hoc",
                "context": "Configurar um arquivo hosts com grupos de servidores e testar a conexão em lote usando comandos ad-hoc.",
                "cmd": "ansible all -m ping -i hosts, ansible web -m shell -a \"uptime\"",
                "aura": "O Ansible não precisa de agentes instalados nas pontas (agentless). Ele opera conectando-se diretamente via SSH."
            },
            192: {
                "title": "Playbooks e Idempotência",
                "context": "Escrever um playbook YAML simples para instalar o editor vim e garantir que ele esteja em sua versão mais recente.",
                "cmd": "ansible-playbook -i hosts site.yml, apt: name=vim state=latest",
                "aura": "Idempotência significa que rodar o playbook uma ou dez vezes gerará exatamente o mesmo resultado sem quebrar nada."
            },
            193: {
                "title": "Variáveis de Inventário e Grupos",
                "context": "Configurar variáveis específicas para o grupo de banco de dados (portas e caminhos) na estrutura group_vars.",
                "cmd": "group_vars/, host_vars/, ansible_port",
                "aura": "Variáveis de grupo permitem diferenciar as portas SSH ou pacotes de produção sem duplicar os códigos das tarefas."
            },
            194: {
                "title": "Handlers e Execuções Condicionais",
                "context": "Configurar um trigger (handler) para reiniciar o serviço Nginx apenas se o arquivo de configuração index.html for alterado.",
                "cmd": "notify: Restart Nginx, handlers: name: Restart Nginx",
                "aura": "Handlers evitam restarts desnecessários de serviços. O serviço só reinicia se houve modificação real no arquivo."
            },
            195: {
                "title": "Loops e Templates Jinja2",
                "context": "Utilizar laço de repetição loop: no Ansible e templates dinâmicos Jinja2 para gerar configurações customizadas por host.",
                "cmd": "template: src=config.j2, loop: {{ items }}",
                "aura": "Jinja2 permite injetar o hostname ou IPs nas configurações dinamicamente em tempo de deploy."
            },
            196: {
                "title": "Ansible Roles e Organização",
                "context": "Dividir o playbook em estruturas de tasks, templates, vars e handlers dentro de Roles isoladas.",
                "cmd": "roles/common/tasks/main.yml, ansible-galaxy init",
                "aura": "Roles modularizam playbooks. Uma role de segurança comum pode ser aplicada a qualquer tipo de servidor instantaneamente."
            },
            197: {
                "title": "Segredos Seguros com Ansible Vault",
                "context": "Criptografar arquivos de credenciais confidenciais de banco de dados usando o utilitário ansible-vault.",
                "cmd": "ansible-vault encrypt credentials.yml, --ask-vault-pass",
                "aura": "Nunca armazene senhas em texto puro em repositórios. O Vault criptografa os arquivos com cifras AES."
            },
            198: {
                "title": "Ações Locais e Delegações",
                "context": "Configurar uma tarefa para notificar a API local de monitoramento usando delegate_to durante a atualização remota.",
                "cmd": "delegate_to: localhost, local_action: uri",
                "aura": "Delegação permite realizar etapas intermediárias de deploy em servidores de build ou gateways sem sair do fluxo."
            },
            199: {
                "title": "Pipelining e Otimização de Performance",
                "context": "Ativar pipelining nas configurações do ansible.cfg para reduzir as conexões SSH em deploys de alta latência.",
                "cmd": "pipelining = True, forks = 10 em ansible.cfg",
                "aura": "Pipelining acelera a execução rodando múltiplos blocos de código na mesma conexão SSH sem recriar túneis."
            },
            200: {
                "title": "[Desafio Integrado] O Orquestrador Ansible",
                "context": "Escrever um playbook integrado estruturado em roles para provisionar segurança, configurar nginx e vault em todos os nós locais.",
                "cmd": "Todos do módulo",
                "aura": "Dezenas de servidores configurados e atualizados perfeitamente com um único comando. Deploy em escala concluído!"
            }
        }
    },
    12: {
        "title": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
        "levels_range": "201 a 210",
        "focus": "Topologias de rede, isolamento e resiliência na AWS",
        "narrative": "O Consórcio EcoGrid monitora usinas de energia fotovoltaica continentais. Uma pane no data center local pode paralisar as usinas. O jogador deve migrar e arquitetar a topologia de rede isolada e segura na nuvem pública AWS.",
        "levels": {
            201: {
                "title": "Virtual Private Cloud (VPC)",
                "context": "Criar uma rede isolada virtual privada com blocos CIDR 10.0.0.0/16 e associar a tabela de rotas e Internet Gateway.",
                "cmd": "aws ec2 create-vpc, internet-gateway, route-table",
                "aura": "Uma VPC isola seu pedaço de hardware virtual do resto da nuvem pública. É a base de toda a segurança de redes."
            },
            202: {
                "title": "Subnets Públicas vs Privadas",
                "context": "Mapear subnets públicas para o balanceador e subnets privadas (através de NAT Gateway) para hospedar as bases de dados.",
                "cmd": "nat-gateway, public-subnet, private-subnet",
                "aura": "Servidores de banco de dados nunca devem ter IPs públicos. Subnets privadas isolam o acesso contra a internet direta."
            },
            203: {
                "title": "Security Groups e NACLs",
                "context": "Configurar regras de portas no Security Group liberando apenas tráfego HTTP/HTTPS do Load Balancer nas instâncias EC2.",
                "cmd": "aws ec2 authorize-security-group-ingress, NACL ports",
                "aura": "Security Groups atuam como firewalls a nível de instância (stateful), enquanto NACLs operam na subnet (stateless)."
            },
            204: {
                "title": "Compute Instances (EC2) e User Data",
                "context": "Lançar instâncias EC2 configuradas automaticamente na inicialização via scripts de provisionamento de User Data.",
                "cmd": "aws ec2 run-instances --user-data, ami-id",
                "aura": "User Data executa scripts de setup no primeiro boot. Excelente para subir servidores web pré-configurados."
            },
            205: {
                "title": "Armazenamento em S3 e CORS",
                "context": "Criar buckets S3 privados, desativar acessos públicos globais e configurar políticas de CORS para a landing page.",
                "cmd": "aws s3 mb, s3-bucket-policy, cross-origin resource sharing",
                "aura": "Armazenamento de objetos como S3 é barato e imutável, mas chaves públicas ou CORS mal-configurados são brechas comuns."
            },
            206: {
                "title": "Acessos IAM de Privilégio Mínimo",
                "context": "Criar perfis de IAM permitindo que apenas a EC2 de processamento leia (sem permissão de escrita) no S3.",
                "cmd": "iam-role, iam-policy, assume-role-policy",
                "aura": "IAM dita quem pode fazer o que na AWS. Nunca use credenciais de root nem passe permissões FullAccess para instâncias."
            },
            207: {
                "title": "CDN Global com CloudFront",
                "context": "Configurar uma distribuição do CloudFront para cachear e servir o frontend globalmente com latência de milissegundos.",
                "cmd": "cloudfront-distribution, origin-access-identity",
                "aura": "O CloudFront distribui seus arquivos estáticos por pontos de presença globais (Edge locations), acelerando o carregamento."
            },
            208: {
                "title": "Rotas Inteligentes com Route 53",
                "context": "Criar registros DNS e políticas de roteamento baseado em geolocalização e failover ativo-passivo.",
                "cmd": "route53-record, latency-routing, active-passive failover",
                "aura": "Route 53 gerencia o DNS da nuvem, permitindo redirecionar tráfego para servidores saudáveis caso um link de rede caia."
            },
            209: {
                "title": "ALB e Auto Scaling Groups",
                "context": "Criar regras de escalabilidade automática baseado no consumo de CPU das instâncias EC2 atrás do Load Balancer.",
                "cmd": "aws autoscaling create-auto-scaling-group, target-group",
                "aura": "Se o consumo subir de 70%, o Auto Scaling lança novas instâncias para dividir a carga, removendo-as quando normalizar."
            },
            210: {
                "title": "[Desafio Integrado] A Rede Isolada AWS",
                "context": "Corrigir topologia quebrada com NAT Gateway inacessível, Security Groups barrando o Load Balancer e instâncias sem IP.",
                "cmd": "Todos do módulo",
                "aura": "Tráfego restabelecido. Topologia AWS isolada, balanceada e escalável rodando em conformidade com as normas."
            }
        }
    },
    13: {
        "title": "Módulo 13: Observabilidade, Métricas e Dashboards",
        "levels_range": "211 a 220",
        "focus": "Métricas distribuídas, análise de performance e logs centralizados",
        "narrative": "No Consórcio EcoGrid Solar, as falhas nos microcontroladores ocorrem de forma assíncrona. Sem coleta centralizada e monitoramento contínuo, a equipe trabalha às cegas. Você deve implantar e integrar a pilha Prometheus e Grafana.",
        "levels": {
            211: {
                "title": "Instrumentação e Coleta Prometheus",
                "context": "Instalar e configurar o arquivo prometheus.yml para coletar métricas a partir do Node Exporter em 3 servidores.",
                "cmd": "prometheus, prometheus.yml, scrape_configs, node_exporter",
                "aura": "O Prometheus usa arquitetura pull, batendo em intervalos regulares no endpoint /metrics para raspar dados."
            },
            212: {
                "title": "Consultas de Tráfego com PromQL",
                "context": "Escrever queries em PromQL para calcular o load average percentual, consumo de CPU e taxa de erros HTTP.",
                "cmd": "rate(http_requests_total[5m]), sum by(status), irate",
                "aura": "PromQL é a linguagem de consulta do Prometheus. rate() e sum() filtram e agregam logs de tráfego de rede."
            },
            213: {
                "title": "Integração e Dashboards no Grafana",
                "context": "Mapear o Prometheus como DataSource no Grafana e criar um painel dinâmico de consumo de hardware.",
                "cmd": "grafana-server, datasource integration, panel graphs",
                "aura": "Grafana transforma números em visualizações ricas. Dashboards facilitam o trabalho de monitoramento em tempo real."
            },
            214: {
                "title": "Alertas no Alertmanager",
                "context": "Definir regras de alertas no Prometheus para disparar emails caso o disco chegue a 90% por mais de 5 minutos.",
                "cmd": "alertmanager, alert: DiskSpaceRunningLow, expr: df_used_percent > 90",
                "aura": "Alertmanager agrupa e filtra alertas, silenciando ruídos repetitivos para evitar a fadiga de alertas no time."
            },
            215: {
                "title": "Logs Centralizados com Grafana Loki",
                "context": "Configurar agentes do Promtail para ler e enviar logs dos servidores de banco de dados para o servidor Loki.",
                "cmd": "loki, promtail, logql query, {} |= \"error\"",
                "aura": "Loki é como o Prometheus, mas para logs. Indexa metadados mantendo a indexação leve e as consultas velozes."
            },
            216: {
                "title": "Monitoramento Externo (Blackbox Exporter)",
                "context": "Configurar o Blackbox Exporter para testar externamente a latência TCP e HTTP dos portais dos clientes.",
                "cmd": "blackbox_exporter, probe_http_status_code",
                "aura": "O monitoramento de caixa-preta testa a aplicação de fora para dentro, simulando o acesso do cliente real."
            },
            217: {
                "title": "Rastreamento Distribuído (Jaeger)",
                "context": "Analisar traces e spans de requisições no Jaeger para localizar qual microserviço está gargalando o sistema de pagamentos.",
                "cmd": "jaeger, spans, traces, context propagation",
                "aura": "Traces mostram o caminho de uma requisição de API por múltiplos servidores. Crucial para rastrear gargalos assíncronos."
            },
            218: {
                "title": "Métricas de Performance da JVM/Runtime",
                "context": "Habilitar e analisar estatísticas internas de Garbage Collector e threads de runtime usando exports dedicados.",
                "cmd": "jmx_exporter, gc_collection_time_seconds",
                "aura": "Gargalos internos como paradas de Garbage Collector podem paralisar a execução sem acusar consumo de CPU externo."
            },
            219: {
                "title": "Profiles Contínuos (Pyroscope)",
                "context": "Inspecionar chamas de execução (flamegraphs) para localizar qual linha exata de código está causando overhead.",
                "cmd": "pyroscope, flamegraphs, CPU profiling",
                "aura": "Profiling contínuo mostra exatamente as funções de código que mais gastam CPU, orientando refatorações."
            },
            220: {
                "title": "[Desafio Integrado] O Centro de Operações (NOC)",
                "context": "Restaurar a monitoração de produção após o servidor Grafana perder chaves de integração, logs de erro Loki caírem e o Alertmanager parar.",
                "cmd": "Todos do módulo",
                "aura": "Métricas e painéis restabelecidos. O centro de operações está monitorando e alertando com precisão!"
            }
        }
    },
    14: {
        "title": "Módulo 14: Alta Disponibilidade de Bancos de Dados e Stateful Services",
        "levels_range": "221 a 230",
        "focus": "Resiliência, replicações e failovers de bancos de dados",
        "narrative": "A TechVanguard não pode tolerar 1 segundo de perda de transação bancária. Bancos de dados de instância única são gargalos e pontos únicos de falha. Você deve clusterizar e replicar dados de forma resiliente.",
        "levels": {
            221: {
                "title": "Tuning de Banco PostgreSQL",
                "context": "Calcular e configurar parâmetros de memória e disco no postgresql.conf para suportar 500 conexões.",
                "cmd": "shared_buffers, max_connections, work_mem em postgresql.conf",
                "aura": "O PostgreSQL padrão vem configurado de forma conservadora. Ajustar o uso de memória acelera ordenações e leituras."
            },
            222: {
                "title": "Replicação Física Assíncrona",
                "context": "Configurar réplicas físicas de leitura (Standby) no PostgreSQL copiando arquivos WAL a partir do nó primário.",
                "cmd": "pg_basebackup, standby.signal, primary_conninfo",
                "aura": "A replicação física garante uma cópia idêntica bit-a-bit dos dados no servidor réplica quase instantaneamente."
            },
            223: {
                "title": "Balanceamento de Réplicas de Leitura",
                "context": "Configurar rotas de queries para balancear operações pesadas de relatórios apenas nos nós secundários de leitura.",
                "cmd": "hot_standby = on, read-only replication routing",
                "aura": "Direcionar queries pesadas de leitura para as réplicas poupa o nó master para focar apenas nas escritas."
            },
            224: {
                "title": "Arquivamento WAL e Point-in-Time Recovery",
                "context": "Habilitar continuous archiving e recuperar a base de dados em um minuto específico do passado (PITR) após deleção acidental.",
                "cmd": "restore_command, recovery_target_time, archive_command",
                "aura": "O WAL archiving grava transações continuamente, permitindo voltar a base de dados a qualquer segundo do passado."
            },
            225: {
                "title": "Pools de Conexões com PgBouncer",
                "context": "Configurar e iniciar o PgBouncer para interceptar e reaproveitar conexões TCP com o banco, reduzindo overhead de handshake.",
                "cmd": "pgbouncer.ini, pool_mode = transaction, max_client_conn",
                "aura": "Criar conexões no PostgreSQL é custoso. O PgBouncer mantem um pool aquecido, escalando o suporte para milhares de clientes."
            },
            226: {
                "title": "Replicação Lógica de Tabelas",
                "context": "Configurar publicação e inscrição (pub/sub) lógicas para replicar apenas tabelas específicas entre bases de dados separadas.",
                "cmd": "CREATE PUBLICATION, CREATE SUBSCRIPTION, logical replication",
                "aura": "A replicação lógica replica linhas e transações de tabelas selecionadas, permitindo cruzar dados entre bancos distintos."
            },
            227: {
                "title": "Cluster Redis e Redundância",
                "context": "Configurar replicações primário-secundário em chaves Redis para garantir a consistência do cache distribuído.",
                "cmd": "redis.conf, replicaof master_ip master_port, redis-cli info replication",
                "aura": "Redis sem replicação perde dados de cache em caso de reboot. Manter réplicas garante a persistência rápida."
            },
            228: {
                "title": "Redis Sentinel para Failover Automático",
                "context": "Configurar Sentinels para monitorar e promover a réplica a primária automaticamente caso o nó master Redis caia.",
                "cmd": "sentinel.conf, sentinel monitor mymaster, sentinel failover",
                "aura": "Sentinel monitora o cluster Redis de forma distribuída, votando a promoção de um novo primário em segundos."
            },
            229: {
                "title": "Backups e Dumps Físicos Seguros",
                "context": "Executar pg_dump e pg_restore de forma limpa e com compressão máxima de dados sem travar a escrita concorrente.",
                "cmd": "pg_dump -Fc -j 4, pg_restore, --no-owner",
                "aura": " dumps lógicos consistentes criam uma fotografia do banco e restauram o esquema em segundos sem travar locks de escrita."
            },
            230: {
                "title": "[Desafio Final Integrado] O Failover do Cluster",
                "context": "Gerenciar uma falha real de queda do PostgreSQL primário: promover manualmente a réplica saudável e chavear o PgBouncer.",
                "cmd": "Todos do módulo",
                "aura": "Cluster promovido com sucesso. Os dados da TechVanguard continuam seguros, consistentes e com zero downtime!"
            }
        }
    }
}

def create_files():
    for mod_num, mod_data in modules_spec.items():
        # 1. Write moduloN.md
        mod_file = os.path.join(WORKSPACE_DIR, "docs", "curriculum", f"modulo{mod_num}.md")
        with open(mod_file, "w", encoding="utf-8") as f:
            f.write(f"# {mod_data['title']}\n")
            f.write(f"## Guia de Níveis ({mod_data['levels_range']}) — Foco: {mod_data['focus']}\n\n")
            f.write("---\n\n## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO\n\n")
            f.write(f"{mod_data['narrative']}\n\n---\n\n## 🛠️ CAPÍTULOS (NÍVEIS)\n\n")
            
            for lvl_num, lvl_data in mod_data['levels'].items():
                f.write(f"#### Nível {lvl_num} — {lvl_data['title']}\n")
                f.write(f"- **Contexto:** {lvl_data['context']}\n")
                f.write(f"- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.\n")
                f.write(f"- **Comando-Chave:** {lvl_data['cmd']}\n")
                f.write(f"- **Diálogo AURA-7:** *\"{lvl_data['aura']}\"*\n\n---\n\n")
            
            f.write("## 📊 RESUMO DO MÓDULO\n\n| Nível | Título | Comando Principal | Dificuldade |\n|:------|:-------|:------------------|:-----------|\n")
            for lvl_num, lvl_data in mod_data['levels'].items():
                difficulty = "easy"
                rel_num = lvl_num % 10
                if rel_num == 0: rel_num = 10
                if rel_num >= 4: difficulty = "medium"
                if rel_num >= 8: difficulty = "hard"
                if lvl_num == 230: difficulty = "legendary"
                f.write(f"| {lvl_num} | {lvl_data['title']} | `{lvl_data['cmd'].split(',')[0]}` | {difficulty} |\n")
                
        # 2. Write moduloN_roadmap.md
        roadmap_file = os.path.join(WORKSPACE_DIR, "docs", "curriculum", f"modulo{mod_num}_roadmap.md")
        with open(roadmap_file, "w", encoding="utf-8") as f:
            f.write(f"# 🗺️ Roadmap de Desenvolvimento: {mod_data['title']}\n\n")
            f.write(f"Este documento rastreia a implementação e teste dos desafios do Módulo {mod_num}.\n\n---\n\n## 1. Status de Desenvolvimento\n\n")
            f.write("| Nível | Título | Status | Validação (Docker) | Assets de Gameplay |\n| :--- | :--- | :--- | :--- | :--- |\n")
            for lvl_num, lvl_data in mod_data['levels'].items():
                f.write(f"| Nível {lvl_num} | {lvl_data['title']} | ⏳ Planejado | ❌ Pendente | ❌ Pendente |\n")
            f.write("\n---\n\n## 2. Metas de Implementação\n- [ ] Criar imagem Docker para os desafios\n- [ ] Escrever validadores Python\n- [ ] Gerar assets visuais\n")
            
        print(f"Created docs/curriculum/modulo{mod_num}.md and docs/curriculum/modulo{mod_num}_roadmap.md successfully.")

if __name__ == "__main__":
    create_files()
