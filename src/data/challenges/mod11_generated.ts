import { Challenge } from "../../types";

export const M11_GENERATED: Challenge[] = [
  {
    "id": "m11_l191",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 191 — Inventários e Comandos Ad-hoc",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar um arquivo hosts com grupos de servidores e testar a conexão em lote usando comandos ad-hoc.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`ansible all -m ping -i hosts, ansible web -m shell -a \"uptime\"`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "hosts": {
          "type": "file",
          "content": "[web]",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m11_l192",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 192 — Playbooks e Idempotência",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nEscrever um playbook YAML simples para instalar o editor vim e garantir que ele esteja em sua versão mais recente.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`ansible-playbook -i hosts site.yml, apt: name=vim state=latest`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "site.yml": {
          "type": "file",
          "content": "---",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m11_l193",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 193 — Variáveis de Inventário e Grupos",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar variáveis específicas para o grupo de banco de dados (portas e caminhos) na estrutura group_vars.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`group_vars/, host_vars/, ansible_port`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "group_vars": {
          "type": "dir",
          "permissions": 755
        },
        "host_vars": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m11_l194",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 194 — Handlers e Execuções Condicionais",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar um trigger (handler) para reiniciar o serviço Nginx apenas se o arquivo de configuração index.html for alterado.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`notify: Restart Nginx, handlers: name: Restart Nginx`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "site.yml": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m11_l195",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 195 — Loops e Templates Jinja2",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nUtilizar laço de repetição loop: no Ansible e templates dinâmicos Jinja2 para gerar configurações customizadas por host.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`template: src=config.j2, loop: {{ items }}`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "site.yml": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m11_l196",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 196 — Ansible Roles e Organização",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nDividir o playbook em estruturas de tasks, templates, vars e handlers dentro de Roles isoladas.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`roles/common/tasks/main.yml, ansible-galaxy init`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m11_l197",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 197 — Segredos Seguros com Ansible Vault",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nCriptografar arquivos de credenciais confidenciais de banco de dados usando o utilitário ansible-vault.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`ansible-vault encrypt credentials.yml, --ask-vault-pass`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "credentials.yml": {
          "type": "file",
          "content": "senha_db = 1234",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m11_l198",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 198 — Ações Locais e Delegações",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar uma tarefa para notificar a API local de monitoramento usando delegate_to durante a atualização remota.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`delegate_to: localhost, local_action: uri`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "site.yml": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m11_l199",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 199 — Pipelining e Otimização de Performance",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 3000,
    "briefing": "## 🎮 Contexto do Freela\nAtivar pipelining nas configurações do ansible.cfg para reduzir as conexões SSH em deploys de alta latência.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`pipelining = True, forks = 10 em ansible.cfg`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "ansible.cfg": {
          "type": "file",
          "content": "[defaults]",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m11_l200",
    "module": "Módulo 11: Provisionamento e Gerenciamento com Ansible",
    "name": "Nível 200 — [Desafio Integrado] O Orquestrador Ansible",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 3500,
    "briefing": "## 🎮 Contexto do Freela\nEscrever um playbook integrado estruturado em roles para provisionar segurança, configurar nginx e vault em todos os nós locais.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`Todos do módulo`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "ansible": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/ansible": {
        "site.yml": {
          "type": "file",
          "content": "---",
          "permissions": 644
        }
      }
    }
  }
];
