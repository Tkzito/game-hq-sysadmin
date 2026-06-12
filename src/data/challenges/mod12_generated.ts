import { Challenge } from "../../types";

export const M12_GENERATED: Challenge[] = [
  {
    "id": "m12_l201",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 201 — Virtual Private Cloud (VPC)",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nCriar uma rede isolada virtual privada com blocos CIDR 10.0.0.0/16 e associar a tabela de rotas e Internet Gateway.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`aws ec2 create-vpc, internet-gateway, route-table`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l202",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 202 — Subnets Públicas vs Privadas",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nMapear subnets públicas para o balanceador e subnets privadas (através de NAT Gateway) para hospedar as bases de dados.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`nat-gateway, public-subnet, private-subnet`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l203",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 203 — Security Groups e NACLs",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar regras de portas no Security Group liberando apenas tráfego HTTP/HTTPS do Load Balancer nas instâncias EC2.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`aws ec2 authorize-security-group-ingress, NACL ports`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l204",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 204 — Compute Instances (EC2) e User Data",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nLançar instâncias EC2 configuradas automaticamente na inicialização via scripts de provisionamento de User Data.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`aws ec2 run-instances --user-data, ami-id`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l205",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 205 — Armazenamento em S3 e CORS",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nCriar buckets S3 privados, desativar acessos públicos globais e configurar políticas de CORS para a landing page.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`aws s3 mb, s3-bucket-policy, cross-origin resource sharing`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l206",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 206 — Acessos IAM de Privilégio Mínimo",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nCriar perfis de IAM permitindo que apenas a EC2 de processamento leia (sem permissão de escrita) no S3.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`iam-role, iam-policy, assume-role-policy`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l207",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 207 — CDN Global com CloudFront",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar uma distribuição do CloudFront para cachear e servir o frontend globalmente com latência de milissegundos.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`cloudfront-distribution, origin-access-identity`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l208",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 208 — Rotas Inteligentes com Route 53",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nCriar registros DNS e políticas de roteamento baseado em geolocalização e failover ativo-passivo.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`route53-record, latency-routing, active-passive failover`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l209",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 209 — ALB e Auto Scaling Groups",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nCriar regras de escalabilidade automática baseado no consumo de CPU das instâncias EC2 atrás do Load Balancer.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`aws autoscaling create-auto-scaling-group, target-group`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m12_l210",
    "module": "Módulo 12: Arquitetura de Nuvem Pública (AWS)",
    "name": "Nível 210 — [Desafio Integrado] A Rede Isolada AWS",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 4000,
    "briefing": "## 🎮 Contexto do Freela\nCorrigir topologia quebrada com NAT Gateway inacessível, Security Groups barrando o Load Balancer e instâncias sem IP.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`Todos do módulo`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "solar_power",
    "hint": "",
    "initialFS": {
      "/": {
        "deploy.sh": {
          "type": "file",
          "content": "aws ec2 run-instances --security-groups default",
          "permissions": 644
        }
      }
    }
  }
];
