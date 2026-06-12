import { Challenge } from "../../types";

export const M10_GENERATED: Challenge[] = [
  {
    "id": "m10_l181",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 181 — Sintaxe HCL e Inicialização",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nDeclarar o provider AWS no Terraform e inicializar o diretório de trabalho baixando os plugins correspondentes.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`terraform init, provider \"aws\" {}`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m10_l182",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 182 — Provisionando Recursos Básicos",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nDeclarar e aplicar a criação de uma instância compute leve (EC2) e um volume de disco associado.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`terraform plan, terraform apply, resource \"aws_instance\" \"web\"`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/infra": {
        "main.tf": {
          "type": "file",
          "content": "resource \"aws_instance\" \"web\" {}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m10_l183",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 183 — Gerenciamento de State Files",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nInspecionar o arquivo terraform.tfstate e ler o estado atual do recurso provisionado.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`terraform show, terraform state list, terraform.tfstate`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/infra": {
        "terraform.tfstate": {
          "type": "file",
          "content": "{}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m10_l184",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 184 — Modularização de Código",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nCriar sub-módulos reutilizáveis na pasta modules/ para isolar a rede dos servidores compute.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`module \"vpc\" { source = \"./modules/vpc\" }`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/infra": {
        "modules": {
          "type": "dir",
          "permissions": 755
        },
        "main.tf": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      },
      "/infra/modules": {
        "vpc": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m10_l185",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 185 — Variáveis e Outputs Dinâmicos",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nDeclarar variáveis de entrada (região, tipo de instância) e exportar o IP público criado através de outputs.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`variable \"region\" {}, output \"public_ip\" {}`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/infra": {
        "main.tf": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m10_l186",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 186 — Resolução de Configuration Drift",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nCorrigir e sincronizar o Terraform após um operador deletar manualmente um disco no painel da AWS.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`terraform refresh, terraform plan, terraform import`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m10_l187",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 187 — Backends Remotos e Locks",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar o Terraform para salvar o arquivo de estado em um bucket S3 remoto com trava de concorrência no DynamoDB.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`backend \"s3\" {}, dynamodb_table`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/infra": {
        "main.tf": {
          "type": "file",
          "content": "terraform { }",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m10_l188",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 188 — Dependências de Recursos e Lifecycle",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar regras de ciclo de vida para criar recursos novos antes de destruir os antigos (create_before_destroy).\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`lifecycle { create_before_destroy = true }, depends_on`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/infra": {
        "main.tf": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m10_l189",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 189 — Linters e Análise de Segurança de IaC",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nRodar tflint e tfsec no código para identificar portas abertas e permissões excessivas antes do deploy.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`tflint, tfsec, terraform validate`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m10_l190",
    "module": "Módulo 10: Infraestrutura como Código (IaC) com Terraform",
    "name": "Nível 190 — [Desafio Integrado] O Provisionador Declarativo",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nProvisionar uma infraestrutura completa composta de VPC, subnets, e instâncias de computação isoladas usando módulos e backend seguro.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`Todos do módulo`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "infra": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/infra": {
        "main.tf": {
          "type": "file",
          "content": "terraform { }",
          "permissions": 644
        }
      }
    }
  }
];
