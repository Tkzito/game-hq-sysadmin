# Módulo 12: Arquitetura de Nuvem Pública (AWS)
## Guia de Níveis (201 a 210) — Foco: Topologias de rede, isolamento e resiliência na AWS

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

O Consórcio EcoGrid monitora usinas de energia fotovoltaica continentais. Uma pane no data center local pode paralisar as usinas. O jogador deve migrar e arquitetar a topologia de rede isolada e segura na nuvem pública AWS.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 201 — Virtual Private Cloud (VPC)
- **Contexto:** Criar uma rede isolada virtual privada com blocos CIDR 10.0.0.0/16 e associar a tabela de rotas e Internet Gateway.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** aws ec2 create-vpc, internet-gateway, route-table
- **Diálogo AURA-7:** *"Uma VPC isola seu pedaço de hardware virtual do resto da nuvem pública. É a base de toda a segurança de redes."*

---

#### Nível 202 — Subnets Públicas vs Privadas
- **Contexto:** Mapear subnets públicas para o balanceador e subnets privadas (através de NAT Gateway) para hospedar as bases de dados.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** nat-gateway, public-subnet, private-subnet
- **Diálogo AURA-7:** *"Servidores de banco de dados nunca devem ter IPs públicos. Subnets privadas isolam o acesso contra a internet direta."*

---

#### Nível 203 — Security Groups e NACLs
- **Contexto:** Configurar regras de portas no Security Group liberando apenas tráfego HTTP/HTTPS do Load Balancer nas instâncias EC2.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** aws ec2 authorize-security-group-ingress, NACL ports
- **Diálogo AURA-7:** *"Security Groups atuam como firewalls a nível de instância (stateful), enquanto NACLs operam na subnet (stateless)."*

---

#### Nível 204 — Compute Instances (EC2) e User Data
- **Contexto:** Lançar instâncias EC2 configuradas automaticamente na inicialização via scripts de provisionamento de User Data.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** aws ec2 run-instances --user-data, ami-id
- **Diálogo AURA-7:** *"User Data executa scripts de setup no primeiro boot. Excelente para subir servidores web pré-configurados."*

---

#### Nível 205 — Armazenamento em S3 e CORS
- **Contexto:** Criar buckets S3 privados, desativar acessos públicos globais e configurar políticas de CORS para a landing page.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** aws s3 mb, s3-bucket-policy, cross-origin resource sharing
- **Diálogo AURA-7:** *"Armazenamento de objetos como S3 é barato e imutável, mas chaves públicas ou CORS mal-configurados são brechas comuns."*

---

#### Nível 206 — Acessos IAM de Privilégio Mínimo
- **Contexto:** Criar perfis de IAM permitindo que apenas a EC2 de processamento leia (sem permissão de escrita) no S3.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** iam-role, iam-policy, assume-role-policy
- **Diálogo AURA-7:** *"IAM dita quem pode fazer o que na AWS. Nunca use credenciais de root nem passe permissões FullAccess para instâncias."*

---

#### Nível 207 — CDN Global com CloudFront
- **Contexto:** Configurar uma distribuição do CloudFront para cachear e servir o frontend globalmente com latência de milissegundos.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** cloudfront-distribution, origin-access-identity
- **Diálogo AURA-7:** *"O CloudFront distribui seus arquivos estáticos por pontos de presença globais (Edge locations), acelerando o carregamento."*

---

#### Nível 208 — Rotas Inteligentes com Route 53
- **Contexto:** Criar registros DNS e políticas de roteamento baseado em geolocalização e failover ativo-passivo.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** route53-record, latency-routing, active-passive failover
- **Diálogo AURA-7:** *"Route 53 gerencia o DNS da nuvem, permitindo redirecionar tráfego para servidores saudáveis caso um link de rede caia."*

---

#### Nível 209 — ALB e Auto Scaling Groups
- **Contexto:** Criar regras de escalabilidade automática baseado no consumo de CPU das instâncias EC2 atrás do Load Balancer.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** aws autoscaling create-auto-scaling-group, target-group
- **Diálogo AURA-7:** *"Se o consumo subir de 70%, o Auto Scaling lança novas instâncias para dividir a carga, removendo-as quando normalizar."*

---

#### Nível 210 — [Desafio Integrado] A Rede Isolada AWS
- **Contexto:** Corrigir topologia quebrada com NAT Gateway inacessível, Security Groups barrando o Load Balancer e instâncias sem IP.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** Todos do módulo
- **Diálogo AURA-7:** *"Tráfego restabelecido. Topologia AWS isolada, balanceada e escalável rodando em conformidade com as normas."*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Comando Principal | Dificuldade |
|:------|:-------|:------------------|:-----------|
| 201 | Virtual Private Cloud (VPC) | `aws ec2 create-vpc` | easy |
| 202 | Subnets Públicas vs Privadas | `nat-gateway` | easy |
| 203 | Security Groups e NACLs | `aws ec2 authorize-security-group-ingress` | easy |
| 204 | Compute Instances (EC2) e User Data | `aws ec2 run-instances --user-data` | medium |
| 205 | Armazenamento em S3 e CORS | `aws s3 mb` | medium |
| 206 | Acessos IAM de Privilégio Mínimo | `iam-role` | medium |
| 207 | CDN Global com CloudFront | `cloudfront-distribution` | medium |
| 208 | Rotas Inteligentes com Route 53 | `route53-record` | hard |
| 209 | ALB e Auto Scaling Groups | `aws autoscaling create-auto-scaling-group` | hard |
| 210 | [Desafio Integrado] A Rede Isolada AWS | `Todos do módulo` | hard |
