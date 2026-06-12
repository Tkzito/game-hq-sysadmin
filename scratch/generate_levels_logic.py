import os
import re

WORKSPACE_DIR = "/mnt/dados/workspaces/Game HQ"

# Let's define the specific logic configurations for setups and validators for Modules 9 to 14
# so that the generator script writes actual, functional setups and validators.

logic_config = {
    # MODULE 9: Nginx
    171: {
        "setup": "mkdir -p /home/operator; echo '<h1>Fintech landing page</h1>' > /home/operator/index.html",
        "validator": "if ! grep -qE 'nginx|systemctl start nginx' /home/operator/.bash_history; then echo 'Falha: Você precisa iniciar o Nginx como servidor web.'; exit 1; fi; echo 'Sucesso: Servidor Web Nginx inicializado!';"
    },
    172: {
        "setup": "mkdir -p /home/operator /etc/nginx/conf.d; echo 'server { listen 80; location /api { } }' > /etc/nginx/conf.d/default.conf",
        "validator": "if ! grep -qE 'proxy_pass' /etc/nginx/conf.d/default.conf && ! grep -qE 'proxy_pass' /etc/nginx/nginx.conf; then echo 'Falha: Você precisa configurar o redirecionamento proxy_pass para a API.'; exit 1; fi; echo 'Sucesso: Proxy reverso configurado com sucesso!';"
    },
    173: {
        "setup": "mkdir -p /home/operator /etc/nginx; echo 'http { }' > /etc/nginx/nginx.conf",
        "validator": "if ! grep -qE 'upstream' /etc/nginx/nginx.conf; then echo 'Falha: Bloco upstream de balanceamento de carga não encontrado.'; exit 1; fi; echo 'Sucesso: Upstream de balanceamento de carga ativo!';"
    },
    174: {
        "setup": "mkdir -p /home/operator /etc/nginx; echo 'server { }' > /etc/nginx/nginx.conf",
        "validator": "if ! grep -qE 'expires|Cache-Control' /etc/nginx/nginx.conf; then echo 'Falha: Diretivas de expiração de cache não configuradas.'; exit 1; fi; echo 'Sucesso: Cache de arquivos estáticos configurado!';"
    },
    175: {
        "setup": "mkdir -p /home/operator /etc/nginx; echo 'server { }' > /etc/nginx/nginx.conf",
        "validator": "if ! grep -qE 'X-Frame-Options|Strict-Transport-Security' /etc/nginx/nginx.conf; then echo 'Falha: Cabeçalhos de segurança HTTP ausentes.'; exit 1; fi; echo 'Sucesso: Headers de segurança aplicados com sucesso!';"
    },
    176: {
        "setup": "mkdir -p /home/operator /etc/nginx; echo 'http { }' > /etc/nginx/nginx.conf",
        "validator": "if ! grep -qE 'limit_req_zone|limit_req' /etc/nginx/nginx.conf; then echo 'Falha: Limitação de taxa de requisições (rate limiting) não encontrada.'; exit 1; fi; echo 'Sucesso: Limitação de taxa ativa!';"
    },
    177: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'certbot' /home/operator/.bash_history; then echo 'Falha: Utilitário certbot não foi executado para gerar certificados.'; exit 1; fi; echo 'Sucesso: Certificado SSL gerado via Let\\'s Encrypt!';"
    },
    178: {
        "setup": "mkdir -p /home/operator /etc/nginx; echo 'server { }' > /etc/nginx/nginx.conf",
        "validator": "if ! grep -qE 'ssl_protocols.*TLSv1.3' /etc/nginx/nginx.conf; then echo 'Falha: Protocolo TLSv1.3 seguro não habilitado.'; exit 1; fi; echo 'Sucesso: Cifras de segurança criptográfica TLS 1.3 ativadas!';"
    },
    179: {
        "setup": "mkdir -p /home/operator /etc/nginx; echo '' > /etc/nginx/nginx.conf",
        "validator": "if [ $(grep -c 'server_name' /etc/nginx/nginx.conf) -lt 2 ]; then echo 'Falha: Configure blocos server blocks separados para api e app.'; exit 1; fi; echo 'Sucesso: Virtual Hosts múltiplos operando na mesma porta!';"
    },
    180: {
        "setup": "mkdir -p /home/operator /etc/nginx; echo 'http { }' > /etc/nginx/nginx.conf",
        "validator": "if ! grep -qE 'proxy_pass' /etc/nginx/nginx.conf || ! grep -qE 'ssl_protocols' /etc/nginx/nginx.conf || ! grep -qE 'limit_req' /etc/nginx/nginx.conf; then echo 'Falha: O arquivo nginx.conf não atende de forma combinada aos critérios de proxy, SSL e rate limit.'; exit 1; fi; echo 'Sucesso: Gateway de Nginx de produção blindado com sucesso!';"
    },

    # MODULE 10: Terraform
    181: {
        "setup": "mkdir -p /home/operator/infra",
        "validator": "if ! grep -qE 'terraform init' /home/operator/.bash_history && [ ! -d /home/operator/infra/.terraform ]; then echo 'Falha: O diretório do Terraform não foi inicializado (rode terraform init).'; exit 1; fi; echo 'Sucesso: Plugins de infraestrutura baixados!';"
    },
    182: {
        "setup": "mkdir -p /home/operator/infra; echo 'resource \"aws_instance\" \"web\" {}' > /home/operator/infra/main.tf",
        "validator": "if ! grep -qE 'terraform apply' /home/operator/.bash_history; then echo 'Falha: O plano de infraestrutura não foi aplicado (rode terraform apply).'; exit 1; fi; echo 'Sucesso: Instância computacional provisionada via IaC!';"
    },
    183: {
        "setup": "mkdir -p /home/operator/infra; echo '{}' > /home/operator/infra/terraform.tfstate",
        "validator": "if ! grep -qE 'terraform show|terraform state list' /home/operator/.bash_history; then echo 'Falha: O estado do Terraform não foi inspecionado.'; exit 1; fi; echo 'Sucesso: Arquivo de estado mapeado!';"
    },
    184: {
        "setup": "mkdir -p /home/operator/infra/modules/vpc; echo '' > /home/operator/infra/main.tf",
        "validator": "if ! grep -qE 'module \"vpc\"' /home/operator/infra/main.tf; then echo 'Falha: A VPC não foi declarada usando módulos.'; exit 1; fi; echo 'Sucesso: Redes isoladas modularizadas!';"
    },
    185: {
        "setup": "mkdir -p /home/operator/infra; echo '' > /home/operator/infra/main.tf",
        "validator": "if ! grep -qE 'variable ' /home/operator/infra/*.tf || ! grep -qE 'output ' /home/operator/infra/*.tf; then echo 'Falha: Defina variáveis de entrada e outputs dinâmicos.'; exit 1; fi; echo 'Sucesso: Parâmetros declarados com flexibilidade!';"
    },
    186: {
        "setup": "mkdir -p /home/operator/infra",
        "validator": "if ! grep -qE 'terraform refresh|terraform import' /home/operator/.bash_history; then echo 'Falha: O drift não foi detectado (rode terraform refresh).'; exit 1; fi; echo 'Sucesso: Sincronia de estado estabelecida!';"
    },
    187: {
        "setup": "mkdir -p /home/operator/infra; echo 'terraform { }' > /home/operator/infra/main.tf",
        "validator": "if ! grep -qE 'backend \"s3\"' /home/operator/infra/*.tf; then echo 'Falha: O backend s3 remoto não foi configurado.'; exit 1; fi; echo 'Sucesso: Estado salvo de forma descentralizada!';"
    },
    188: {
        "setup": "mkdir -p /home/operator/infra; echo '' > /home/operator/infra/main.tf",
        "validator": "if ! grep -qE 'create_before_destroy|depends_on' /home/operator/infra/*.tf; then echo 'Falha: Ciclo de vida e dependências de recursos não configuradas.'; exit 1; fi; echo 'Sucesso: Sequência lógica de deploys garantida!';"
    },
    189: {
        "setup": "mkdir -p /home/operator/infra",
        "validator": "if ! grep -qE 'tflint|tfsec|terraform validate' /home/operator/.bash_history; then echo 'Falha: Testes de linter e auditoria de segurança estáticos não executados.'; exit 1; fi; echo 'Sucesso: Código de infraestrutura validado contra vulnerabilidades!';"
    },
    190: {
        "setup": "mkdir -p /home/operator/infra; echo 'terraform { }' > /home/operator/infra/main.tf",
        "validator": "if ! grep -qE 'module \"vpc\"' /home/operator/infra/*.tf || ! grep -qE 'backend \"s3\"' /home/operator/infra/*.tf; then echo 'Falha: O arquivo principal não atende às diretrizes combinadas de módulos e backend remoto do desafio.'; exit 1; fi; echo 'Sucesso: Módulo Terraform de produção implantado!';"
    },

    # MODULE 11: Ansible
    191: {
        "setup": "mkdir -p /home/operator/ansible; echo '[web]' > /home/operator/ansible/hosts",
        "validator": "if ! grep -qE 'ansible ' /home/operator/.bash_history; then echo 'Falha: Teste a comunicação ad-hoc dos hosts (ansible all -m ping).'; exit 1; fi; echo 'Sucesso: Inventário de comunicação estabelecido!';"
    },
    192: {
        "setup": "mkdir -p /home/operator/ansible; echo '---' > /home/operator/ansible/site.yml",
        "validator": "if ! grep -qE 'apt|package|yum' /home/operator/ansible/site.yml || ! grep -qE 'ansible-playbook' /home/operator/.bash_history; then echo 'Falha: Playbook para instalação do vim não configurado ou executado.'; exit 1; fi; echo 'Sucesso: Playbook idempotente aplicado com sucesso!';"
    },
    193: {
        "setup": "mkdir -p /home/operator/ansible/group_vars /home/operator/ansible/host_vars",
        "validator": "if [ ! -d /home/operator/ansible/group_vars ] && [ ! -d /home/operator/ansible/host_vars ]; then echo 'Falha: Diretórios de host_vars ou group_vars não encontrados.'; exit 1; fi; echo 'Sucesso: Escopo de variáveis por grupos ativado!';"
    },
    194: {
        "setup": "mkdir -p /home/operator/ansible; echo '' > /home/operator/ansible/site.yml",
        "validator": "if ! grep -qE 'notify:' /home/operator/ansible/site.yml || ! grep -qE 'handlers:' /home/operator/ansible/site.yml; then echo 'Falha: Mecanismo de notificação (handlers) ausente no playbook.'; exit 1; fi; echo 'Sucesso: Reinicialização condicional de serviços configurada!';"
    },
    195: {
        "setup": "mkdir -p /home/operator/ansible; echo '' > /home/operator/ansible/site.yml",
        "validator": "if ! grep -qE 'loop:|with_items' /home/operator/ansible/site.yml || ! grep -qE 'template:' /home/operator/ansible/site.yml; then echo 'Falha: Loops ou templates Jinja2 não encontrados no playbook.'; exit 1; fi; echo 'Sucesso: Templates dinâmicos gerados em loops!';"
    },
    196: {
        "setup": "mkdir -p /home/operator/ansible",
        "validator": "if [ ! -d /home/operator/ansible/roles ] || [ ! -f /home/operator/ansible/roles/common/tasks/main.yml ]; then echo 'Falha: A estrutura de Roles do Ansible (roles/common/tasks/main.yml) não foi criada.'; exit 1; fi; echo 'Sucesso: Lógica organizada em papéis (roles) reutilizáveis!';"
    },
    197: {
        "setup": "mkdir -p /home/operator/ansible; echo 'senha_db = 1234' > /home/operator/ansible/credentials.yml",
        "validator": "if ! grep -qE '\\$ANSIBLE_VAULT' /home/operator/ansible/credentials.yml; then echo 'Falha: Credenciais não criptografadas. Use ansible-vault encrypt.'; exit 1; fi; echo 'Sucesso: Chaves confidenciais protegidas por criptografia!';"
    },
    198: {
        "setup": "mkdir -p /home/operator/ansible; echo '' > /home/operator/ansible/site.yml",
        "validator": "if ! grep -qE 'delegate_to|local_action' /home/operator/ansible/site.yml; then echo 'Falha: Delegação de tarefas locais/remotas ausente no playbook.'; exit 1; fi; echo 'Sucesso: Roteamento de comandos intermediários executado!';"
    },
    199: {
        "setup": "mkdir -p /home/operator/ansible; echo '[defaults]' > /home/operator/ansible/ansible.cfg",
        "validator": "if ! grep -qE 'pipelining.*True' /home/operator/ansible/ansible.cfg; then echo 'Falha: Pipelining de conexões SSH não ativado no ansible.cfg.'; exit 1; fi; echo 'Sucesso: Conexões de rede otimizadas!';"
    },
    200: {
        "setup": "mkdir -p /home/operator/ansible; echo '---' > /home/operator/ansible/site.yml",
        "validator": "if ! grep -qE 'roles:' /home/operator/ansible/site.yml || ! grep -qE '\\$ANSIBLE_VAULT' /home/operator/ansible/*.yml; then echo 'Falha: Playbook integrado não atende de forma combinada a roles e vault.'; exit 1; fi; echo 'Sucesso: Orquestrador Ansible implantado com sucesso!';"
    },

    # MODULE 12: AWS Cloud
    201: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'aws ec2 create-vpc' /home/operator/.bash_history; then echo 'Falha: Comando de criação de VPC (aws ec2 create-vpc) não executado.'; exit 1; fi; echo 'Sucesso: Rede virtual VPC provisionada na nuvem!';"
    },
    202: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'create-subnet' /home/operator/.bash_history || ! grep -qE 'create-nat-gateway' /home/operator/.bash_history; then echo 'Falha: Subnets privadas/públicas ou NAT Gateway não provisionados.'; exit 1; fi; echo 'Sucesso: Subnets segmentadas com sucesso!';"
    },
    203: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'authorize-security-group-ingress|create-security-group' /home/operator/.bash_history; then echo 'Falha: Regras do Security Group não configuradas.'; exit 1; fi; echo 'Sucesso: Firewalls de portas ativados na nuvem!';"
    },
    204: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'run-instances.*--user-data' /home/operator/.bash_history; then echo 'Falha: EC2 não lançada ou scripts de User Data ausentes.'; exit 1; fi; echo 'Sucesso: Instância com provimento automático de boot criada!';"
    },
    205: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 's3 mb|create-bucket' /home/operator/.bash_history; then echo 'Falha: Bucket S3 não criado.'; exit 1; fi; echo 'Sucesso: Bucket de arquivos estáticos ativo!';"
    },
    206: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'iam.*role|iam.*policy' /home/operator/.bash_history; then echo 'Falha: Perfis de privilégio mínimo do IAM ausentes.'; exit 1; fi; echo 'Sucesso: Políticas IAM aplicadas com sucesso!';"
    },
    207: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'cloudfront.*distribution' /home/operator/.bash_history; then echo 'Falha: CDN de distribuição global não configurada.'; exit 1; fi; echo 'Sucesso: Distribuição CloudFront activa!';"
    },
    208: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'route53' /home/operator/.bash_history; then echo 'Falha: Registros ou rotas de DNS Route 53 não configurados.'; exit 1; fi; echo 'Sucesso: Roteamento geográfico ativo!';"
    },
    209: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'autoscaling|scaling-policy' /home/operator/.bash_history; then echo 'Falha: Auto Scaling Group para escalabilidade de instâncias não configurado.'; exit 1; fi; echo 'Sucesso: Dimensionamento automático de infraestrutura ativo!';"
    },
    210: {
        "setup": "mkdir -p /home/operator; echo 'aws ec2 run-instances --security-groups default' > /home/operator/deploy.sh",
        "validator": "if grep -qE 'default' /home/operator/deploy.sh; then echo 'Falha: O script ainda contém referências de Security Group inválidas.'; exit 1; fi; echo 'Sucesso: Rede AWS isolada corrigida e validada!';"
    },

    # MODULE 13: Observability
    211: {
        "setup": "mkdir -p /home/operator /etc/prometheus; echo 'global: {}' > /etc/prometheus/prometheus.yml",
        "validator": "if ! grep -qE 'node_exporter' /etc/prometheus/prometheus.yml; then echo 'Falha: Alvo de raspagem do Node Exporter ausente no prometheus.yml.'; exit 1; fi; echo 'Sucesso: Scrape de métricas distribuídas ativo!';"
    },
    212: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'rate\\(|sum\\(' /home/operator/.bash_history; then echo 'Falha: Consultas de tráfego com rate/sum em PromQL não executadas.'; exit 1; fi; echo 'Sucesso: queries PromQL validadas!';"
    },
    213: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'grafana-server' /home/operator/.bash_history; then echo 'Falha: Servidor Grafana não inicializado.'; exit 1; fi; echo 'Sucesso: Servidor Grafana ativo e integrado!';"
    },
    214: {
        "setup": "mkdir -p /home/operator /etc/prometheus; echo 'groups: []' > /etc/prometheus/rules.yml",
        "validator": "if ! grep -qE 'alert:|expr:' /etc/prometheus/rules.yml; then echo 'Falha: Alertas e expressões lógicas ausentes no rules.yml do Prometheus.'; exit 1; fi; echo 'Sucesso: Alertas automáticos do Alertmanager configurados!';"
    },
    215: {
        "setup": "mkdir -p /home/operator /etc/promtail; echo 'server: {}' > /etc/promtail/promtail.yml",
        "validator": "if ! grep -qE 'loki|clients:' /etc/promtail/promtail.yml; then echo 'Falha: Configuração de clientes Loki ausente no Promtail.'; exit 1; fi; echo 'Sucesso: Envio centralizado de logs via Loki ativo!';"
    },
    216: {
        "setup": "mkdir -p /home/operator /etc/prometheus; echo 'scrape_configs: []' > /etc/prometheus/prometheus.yml",
        "validator": "if ! grep -qE 'blackbox_exporter|blackbox' /etc/prometheus/prometheus.yml; then echo 'Falha: Configuração de monitoramento Blackbox externa ausente.'; exit 1; fi; echo 'Sucesso: Teste de latência externa TCP/HTTP ativo!';"
    },
    217: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'jaeger|spans|traces' /home/operator/.bash_history; then echo 'Falha: Consultas forenses de traces distribuídos no Jaeger não efetuadas.'; exit 1; fi; echo 'Sucesso: Jaeger rastreou os gargalos de microsserviços!';"
    },
    218: {
        "setup": "mkdir -p /home/operator /etc/prometheus; echo 'scrape_configs: []' > /etc/prometheus/prometheus.yml",
        "validator": "if ! grep -qE 'jmx_exporter|jvm' /etc/prometheus/prometheus.yml; then echo 'Falha: Coleta de métricas internas da JVM/Runtime ausente.'; exit 1; fi; echo 'Sucesso: Monitoramento JVM integrado!';"
    },
    219: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'pyroscope' /home/operator/.bash_history; then echo 'Falha: Agente pyroscope para profiles contínuos de código não executado.'; exit 1; fi; echo 'Sucesso: flamegraphs integrados no profile de CPU!';"
    },
    220: {
        "setup": "mkdir -p /home/operator /etc/prometheus; echo '' > /etc/prometheus/prometheus.yml",
        "validator": "if ! grep -qE 'node_exporter' /etc/prometheus/prometheus.yml || ! grep -qE 'alert:' /etc/prometheus/*.yml; then echo 'Falha: Configurações de NOC integradas incompletas.'; exit 1; fi; echo 'Sucesso: Centro de operações (NOC) reativado e integrado!';"
    },

    # MODULE 14: DB High Availability
    221: {
        "setup": "mkdir -p /home/operator /etc/postgresql; echo 'max_connections = 100' > /etc/postgresql/postgresql.conf",
        "validator": "if ! grep -qE 'shared_buffers|max_connections = 500' /etc/postgresql/postgresql.conf; then echo 'Falha: Parâmetros de performance de conexões e buffers do PostgreSQL não configurados.'; exit 1; fi; echo 'Sucesso: Tuning do banco de dados concluído!';"
    },
    222: {
        "setup": "mkdir -p /home/operator /var/lib/postgresql/data",
        "validator": "if [ ! -f /var/lib/postgresql/data/standby.signal ]; then echo 'Falha: Arquivo standby.signal de réplica de leitura ausente.'; exit 1; fi; echo 'Sucesso: Replicação física assíncrona estabelecida!';"
    },
    223: {
        "setup": "mkdir -p /home/operator /etc/postgresql; echo 'hot_standby = off' > /etc/postgresql/postgresql.conf",
        "validator": "if ! grep -qE 'hot_standby = on' /etc/postgresql/postgresql.conf; then echo 'Falha: Permissão de réplica de leitura (hot_standby = on) desativada.'; exit 1; fi; echo 'Sucesso: Réplicas de leitura integradas com sucesso!';"
    },
    224: {
        "setup": "mkdir -p /home/operator /etc/postgresql; echo 'archive_mode = off' > /etc/postgresql/postgresql.conf",
        "validator": "if ! grep -qE 'archive_mode = on' /etc/postgresql/postgresql.conf || ! grep -qE 'archive_command' /etc/postgresql/postgresql.conf; then echo 'Falha: WAL archiving contínuo para PITR desativado.'; exit 1; fi; echo 'Sucesso: Continuous archiving para recuperação point-in-time ativo!';"
    },
    225: {
        "setup": "mkdir -p /home/operator /etc/pgbouncer; echo 'pool_mode = session' > /etc/pgbouncer/pgbouncer.ini",
        "validator": "if ! grep -qE 'pool_mode = transaction' /etc/pgbouncer/pgbouncer.ini; then echo 'Falha: Pool mode de transação rápida no PgBouncer não configurado.'; exit 1; fi; echo 'Sucesso: Pool de conexões do PgBouncer ativo!';"
    },
    226: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'CREATE PUBLICATION|CREATE SUBSCRIPTION' /home/operator/.bash_history; then echo 'Falha: Comandos SQL de replicação lógica (pub/sub) não executados.'; exit 1; fi; echo 'Sucesso: Replicação lógica de tabelas ativa!';"
    },
    227: {
        "setup": "mkdir -p /home/operator /etc/redis; echo 'port 6379' > /etc/redis/redis.conf",
        "validator": "if ! grep -qE 'replicaof|slaveof' /etc/redis/redis.conf; then echo 'Falha: Replicação primário-secundário Redis não configurada.'; exit 1; fi; echo 'Sucesso: Redundância de cache Redis ativa!';"
    },
    228: {
        "setup": "mkdir -p /home/operator /etc/redis; echo 'sentinel monitor' > /etc/redis/sentinel.conf",
        "validator": "if ! grep -qE 'sentinel monitor' /etc/redis/sentinel.conf || ! grep -qE 'sentinel failover' /home/operator/.bash_history; then echo 'Falha: Sentinels Redis para failover automático não configurados ou testados.'; exit 1; fi; echo 'Sucesso: Auto-failover Redis via Sentinel ativo!';"
    },
    229: {
        "setup": "mkdir -p /home/operator",
        "validator": "if ! grep -qE 'pg_dump.*-j|pg_dump.*-F' /home/operator/.bash_history; then echo 'Falha: Backup físico condensado pg_dump com compressão e threads não executado.'; exit 1; fi; echo 'Sucesso: Dumps de banco gerados com sucesso!';"
    },
    230: {
        "setup": "mkdir -p /home/operator /etc/pgbouncer; echo 'database_host = 10.0.0.10' > /etc/pgbouncer/pgbouncer.ini",
        "validator": "if ! grep -qE 'pg_ctl promote' /home/operator/.bash_history; then echo 'Falha: A réplica de leitura não foi promovida a master (rode pg_ctl promote).'; exit 1; fi; echo 'Sucesso: Failover de banco promovido com zero downtime!';"
    }
}

def generate_level_files():
    for mod in range(9, 15):
        mod_file = os.path.join(WORKSPACE_DIR, "docs", "curriculum", f"modulo{mod}.md")
        if not os.path.exists(mod_file):
            print(f"Spec file not found: {mod_file}")
            continue
            
        with open(mod_file, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Parse levels
        level_matches = list(re.finditer(r"#### Nível\s+(\d+)\s+[-—]\s+([^\n]+)", content))
        
        for i, match in enumerate(level_matches):
            lvl_num = int(match.group(1))
            lvl_title = match.group(2).strip()
            
            # Get text block
            start_idx = match.end()
            end_idx = level_matches[i+1].start() if i + 1 < len(level_matches) else len(content)
            lvl_text = content[start_idx:end_idx].strip()
            
            # Extract sections
            context_m = re.search(r"-\s+\*\*Contexto:\*\*\s*(.*?)(?=\n-\s+\*\*|\n\n|\Z)", lvl_text, re.DOTALL)
            mission_m = re.search(r"-\s+\*\*Missão:\*\*\s*(.*?)(?=\n-\s+\*\*|\n\n|\Z)", lvl_text, re.DOTALL)
            cmd_m = re.search(r"-\s+\*\*Comando-Chave:\*\*\s*(.*?)(?=\n-\s+\*\*|\n\n|\Z)", lvl_text, re.DOTALL)
            
            briefing_content = f"# Nível {lvl_num} — {lvl_title}\n\n"
            if context_m:
                briefing_content += f"## 🎮 Contexto do Freela\n{context_m.group(1).strip()}\n\n"
            if mission_m:
                briefing_content += f"## 🛠️ Missão\n{mission_m.group(1).strip()}\n\n"
            if cmd_m:
                briefing_content += f"## 🎯 Comando-Chave\n`{cmd_m.group(1).strip()}`\n\n"
                
            briefing_content += f"## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.\n"
            
            # Paths
            lvl_dir = os.path.join(WORKSPACE_DIR, "levels", f"modulo{mod}", f"level{lvl_num}")
            os.makedirs(lvl_dir, exist_ok=True)
            
            # 1. Write briefing.md
            with open(os.path.join(lvl_dir, "briefing.md"), "w", encoding="utf-8") as f_out:
                f_out.write(briefing_content)
                
            # 2. Write custom Dockerfile based on module
            docker_packages = ""
            if mod == 9:
                docker_packages = "RUN apk add --no-cache nginx certbot curl"
            elif mod == 10:
                docker_packages = "RUN apk add --no-cache curl unzip && \\\n    curl -o terraform.zip https://releases.hashicorp.com/terraform/1.5.7/terraform_1.5.7_linux_amd64.zip && \\\n    unzip terraform.zip && mv terraform /usr/bin/ && rm terraform.zip"
            elif mod == 11:
                docker_packages = "RUN apk add --no-cache ansible shadow"
            elif mod == 12:
                docker_packages = "RUN apk add --no-cache python3 py3-pip && pip3 install awscli --break-system-packages"
            elif mod == 13:
                docker_packages = "RUN apk add --no-cache curl"
            elif mod == 14:
                docker_packages = "RUN apk add --no-cache postgresql-client redis"
                
            dockerfile_content = f"FROM gamehq-compile-base:latest\nUSER root\n{docker_packages}\nUSER operator\n"
            with open(os.path.join(lvl_dir, "Dockerfile"), "w", encoding="utf-8") as f_out:
                f_out.write(dockerfile_content)
                
            # 3. Write setup.sh
            setup_script = logic_config.get(lvl_num, {}).get("setup", "mkdir -p /home/operator")
            setup_content = f"#!/bin/bash\nset -euo pipefail\n{setup_script}\nchown -R operator:operator /home/operator 2>/dev/null || true\n"
            setup_path = os.path.join(lvl_dir, "setup.sh")
            with open(setup_path, "w", encoding="utf-8") as f_out:
                f_out.write(setup_content)
            os.chmod(setup_path, 0o755)
            
            # 4. Write validator.sh
            validator_script = logic_config.get(lvl_num, {}).get("validator", "echo 'Sucesso'; exit 0;")
            validator_content = f"#!/bin/bash\nset -euo pipefail\n{validator_script}\n"
            val_path = os.path.join(lvl_dir, "validator.sh")
            with open(val_path, "w", encoding="utf-8") as f_out:
                f_out.write(validator_content)
            os.chmod(val_path, 0o755)
            
            print(f"Generated level files for Module {mod} Level {lvl_num} successfully.")

if __name__ == "__main__":
    generate_level_files()
