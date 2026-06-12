# Módulo 10: Infraestrutura como Código (IaC) com Terraform
## Guia de Níveis (181 a 190) — Foco: Provisionamento automático de infraestrutura na nuvem

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

A fintech TechVanguard está migrando toda a infraestrutura física para a Nuvem. Criar servidores clicando no painel gera drifts e inconsistências. Você deve automatizar todo o ciclo de vida dos servidores escrevendo código declarativo e imutável com Terraform.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 181 — Sintaxe HCL e Inicialização
- **Contexto:** Declarar o provider AWS no Terraform e inicializar o diretório de trabalho baixando os plugins correspondentes.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** terraform init, provider "aws" {}
- **Diálogo AURA-7:** *"O Terraform usa HCL (HashiCorp Configuration Language). O comando init baixa os drivers e conecta ao ecossistema da nuvem."*

---

#### Nível 182 — Provisionando Recursos Básicos
- **Contexto:** Declarar e aplicar a criação de uma instância compute leve (EC2) e um volume de disco associado.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** terraform plan, terraform apply, resource "aws_instance" "web"
- **Diálogo AURA-7:** *"O plan mostra o que vai acontecer. O apply executa as chamadas de API reais. É infraestrutura declarada em código."*

---

#### Nível 183 — Gerenciamento de State Files
- **Contexto:** Inspecionar o arquivo terraform.tfstate e ler o estado atual do recurso provisionado.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** terraform show, terraform state list, terraform.tfstate
- **Diálogo AURA-7:** *"O arquivo de estado é a fonte de verdade do Terraform. Nunca edite esse arquivo JSON manualmente."*

---

#### Nível 184 — Modularização de Código
- **Contexto:** Criar sub-módulos reutilizáveis na pasta modules/ para isolar a rede dos servidores compute.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** module "vpc" { source = "./modules/vpc" }
- **Diálogo AURA-7:** *"Isolar lógica em módulos reaproveitáveis evita duplicação de código e padroniza a segurança."*

---

#### Nível 185 — Variáveis e Outputs Dinâmicos
- **Contexto:** Declarar variáveis de entrada (região, tipo de instância) e exportar o IP público criado através de outputs.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** variable "region" {}, output "public_ip" {}
- **Diálogo AURA-7:** *"Variáveis tornam o código flexível para staging e produção. Outputs facilitam a integração em pipelines."*

---

#### Nível 186 — Resolução de Configuration Drift
- **Contexto:** Corrigir e sincronizar o Terraform após um operador deletar manualmente um disco no painel da AWS.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** terraform refresh, terraform plan, terraform import
- **Diálogo AURA-7:** *"Qualquer alteração manual causa desvio. O refresh força o código a re-ler o estado e propor a recriação automática."*

---

#### Nível 187 — Backends Remotos e Locks
- **Contexto:** Configurar o Terraform para salvar o arquivo de estado em um bucket S3 remoto com trava de concorrência no DynamoDB.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** backend "s3" {}, dynamodb_table
- **Diálogo AURA-7:** *"Salvar o estado localmente impede o trabalho em equipe. Backends remotos com locks previnem conflitos de escrita."*

---

#### Nível 188 — Dependências de Recursos e Lifecycle
- **Contexto:** Configurar regras de ciclo de vida para criar recursos novos antes de destruir os antigos (create_before_destroy).
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** lifecycle { create_before_destroy = true }, depends_on
- **Diálogo AURA-7:** *"Controlar a ordem de criação previne quedas (downtime). O depends_on força a rede a subir antes do servidor."*

---

#### Nível 189 — Linters e Análise de Segurança de IaC
- **Contexto:** Rodar tflint e tfsec no código para identificar portas abertas e permissões excessivas antes do deploy.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** tflint, tfsec, terraform validate
- **Diálogo AURA-7:** *"Validadores estáticos bloqueiam chaves expostas e configurações de rede abertas na internet antes que cheguem à produção."*

---

#### Nível 190 — [Desafio Integrado] O Provisionador Declarativo
- **Contexto:** Provisionar uma infraestrutura completa composta de VPC, subnets, e instâncias de computação isoladas usando módulos e backend seguro.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** Todos do módulo
- **Diálogo AURA-7:** *"A infraestrutura inteira da TechVanguard foi criada em 45 segundos. Código aprovado e versionado de forma robusta."*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Comando Principal | Dificuldade |
|:------|:-------|:------------------|:-----------|
| 181 | Sintaxe HCL e Inicialização | `terraform init` | easy |
| 182 | Provisionando Recursos Básicos | `terraform plan` | easy |
| 183 | Gerenciamento de State Files | `terraform show` | easy |
| 184 | Modularização de Código | `module "vpc" { source = "./modules/vpc" }` | medium |
| 185 | Variáveis e Outputs Dinâmicos | `variable "region" {}` | medium |
| 186 | Resolução de Configuration Drift | `terraform refresh` | medium |
| 187 | Backends Remotos e Locks | `backend "s3" {}` | medium |
| 188 | Dependências de Recursos e Lifecycle | `lifecycle { create_before_destroy = true }` | hard |
| 189 | Linters e Análise de Segurança de IaC | `tflint` | hard |
| 190 | [Desafio Integrado] O Provisionador Declarativo | `Todos do módulo` | hard |
