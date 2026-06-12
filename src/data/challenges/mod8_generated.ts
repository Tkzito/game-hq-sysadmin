import { Challenge } from "../../types";

export const M8_GENERATED: Challenge[] = [
  {
    "id": "m8_l162",
    "module": "Módulo 8: SRE e Cibersegurança Internacional",
    "name": "Nível 162 — Auditoria de Nós de Produção (Integridade)",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 1500,
    "briefing": "## 🎮 Contexto do Freela\nRelatórios indicam que alguns nós do cluster regional de monitoramento estão instáveis devido a falhas elétricas nas subestações.\n\n## 🎯 Comando-Chave\n``clusterctl get nodes`, `clusterctl describe cluster``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".cluster_state.json": {
          "type": "file",
          "content": "{\n  \"nodes\": [\n    {\n      \"name\": \"eco-node-1\",\n      \"status\": \"Ready\",\n      \"role\": \"control-plane\",\n      \"version\": \"v1.25.0\"\n    },\n    {\n      \"name\": \"eco-node-2\",\n      \"status\": \"Ready\",\n      \"role\": \"worker\",\n      \"version\": \"v1.25.0\"\n    },\n    {\n      \"name\": \"eco-node-3\",\n      \"status\": \"NotReady\",\n      \"role\": \"worker\",\n      \"version\": \"v1.25.0\"\n    }\n  ],\n  \"pods\": []\n}",
          "permissions": 644
        },
        ".cluster_usage": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m8_l163",
    "module": "Módulo 8: SRE e Cibersegurança Internacional",
    "name": "Nível 163 — Alta Disponibilidade e Escalonamento",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 1500,
    "briefing": "## 🎮 Contexto do Freela\nO início de um dia ensolarado multiplica o envio de logs das usinas por 10. O servidor de telemetria precisa de mais capacidade de processamento imediata.\n\n## 🎯 Comando-Chave\n`Alterar valor da chave `replicas: 5` em `deployment.yaml`.`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        "deployment.yaml": {
          "type": "file",
          "content": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: telemetry-gateway\n  labels:\n    app: telemetry\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: telemetry\n  template:\n    metadata:\n      labels:\n        app: telemetry\n    spec:\n      containers:\n      - name: gateway\n        image: ecogrid/telemetry-gateway:v1.0.0\n        ports:\n        - containerPort: 8080",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m8_l164",
    "module": "Módulo 8: SRE e Cibersegurança Internacional",
    "name": "Nível 164 — Reconciliação Contínua (Aplicação de Manifesto)",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 1500,
    "briefing": "## 🎮 Contexto do Freela\nO novo manifesto atualizado de escalonamento precisa ser implantado no cluster de produção sob regras de segurança estritas.\n\n## 🎯 Comando-Chave\n``clusterctl apply -f deployment.yaml``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        "deployment.yaml": {
          "type": "file",
          "content": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: telemetry-gateway\n  labels:\n    app: telemetry\nspec:\n  replicas: 5\n  selector:\n    matchLabels:\n      app: telemetry\n  template:\n    metadata:\n      labels:\n        app: telemetry\n    spec:\n      containers:\n      - name: gateway\n        image: ecogrid/telemetry-gateway:v1.0.0\n        ports:\n        - containerPort: 8080",
          "permissions": 644
        },
        ".cluster_state.json": {
          "type": "file",
          "content": "{\n  \"nodes\": [\n    {\n      \"name\": \"eco-node-1\",\n      \"status\": \"Ready\",\n      \"role\": \"control-plane\",\n      \"version\": \"v1.25.0\"\n    },\n    {\n      \"name\": \"eco-node-2\",\n      \"status\": \"Ready\",\n      \"role\": \"worker\",\n      \"version\": \"v1.25.0\"\n    },\n    {\n      \"name\": \"eco-node-3\",\n      \"status\": \"Ready\",\n      \"role\": \"worker\",\n      \"version\": \"v1.25.0\"\n    }\n  ],\n  \"pods\": []\n}",
          "permissions": 644
        },
        ".cluster_usage": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m8_l165",
    "module": "Módulo 8: SRE e Cibersegurança Internacional",
    "name": "Nível 165 — Simulação de Failover Ativo",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 1500,
    "briefing": "## 🎮 Contexto do Freela\nA subestação de fornecimento do nó 3 pegou fogo. O servidor local perdeu energia e desconectou permanentemente da rede.\n\n## 🎯 Comando-Chave\n``clusterctl delete node eco-node-3``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".cluster_state.json": {
          "type": "file",
          "content": "{\n  \"nodes\": [\n    {\n      \"name\": \"eco-node-1\",\n      \"status\": \"Ready\",\n      \"role\": \"control-plane\",\n      \"version\": \"v1.25.0\"\n    },\n    {\n      \"name\": \"eco-node-2\",\n      \"status\": \"Ready\",\n      \"role\": \"worker\",\n      \"version\": \"v1.25.0\"\n    },\n    {\n      \"name\": \"eco-node-3\",\n      \"status\": \"Ready\",\n      \"role\": \"worker\",\n      \"version\": \"v1.25.0\"\n    }\n  ],\n  \"pods\": []\n}",
          "permissions": 644
        },
        ".cluster_usage": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m8_l166",
    "module": "Módulo 8: SRE e Cibersegurança Internacional",
    "name": "Nível 166 — Self-Healing (Auto-Recuperação)",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 1500,
    "briefing": "## 🎮 Contexto do Freela\nUm pod contendo o monitor de tensão solar entrou em loop infinito de pânico e travou.\n\n## 🎯 Comando-Chave\n`Inserir `livenessProbe` e `readinessProbe` no manifesto YAML e aplicar alterações.`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        "deployment.yaml": {
          "type": "file",
          "content": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: telemetry-gateway\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: telemetry\n  template:\n    metadata:\n      labels:\n        app: telemetry\n    spec:\n      containers:\n      - name: gateway\n        image: ecogrid/telemetry-gateway:v1.0.0\n        ports:\n        - containerPort: 8080",
          "permissions": 644
        },
        ".cluster_state.json": {
          "type": "file",
          "content": "{\n  \"nodes\": [\n    {\n      \"name\": \"eco-node-1\",\n      \"status\": \"Ready\",\n      \"role\": \"control-plane\",\n      \"version\": \"v1.25.0\"\n    },\n    {\n      \"name\": \"eco-node-2\",\n      \"status\": \"Ready\",\n      \"role\": \"worker\",\n      \"version\": \"v1.25.0\"\n    }\n  ],\n  \"pods\": [\n    {\n      \"name\": \"telemetry-gateway-55a2c3-1\",\n      \"ready\": \"1/1\",\n      \"status\": \"Running\",\n      \"restarts\": 0,\n      \"age\": \"2h\"\n    },\n    {\n      \"name\": \"telemetry-gateway-55a2c3-2\",\n      \"ready\": \"1/1\",\n      \"status\": \"Running\",\n      \"restarts\": 0,\n      \"age\": \"2h\"\n    },\n    {\n      \"name\": \"telemetry-gateway-55a2c3-3\",\n      \"ready\": \"0/1\",\n      \"status\": \"CrashLoopBackOff\",\n      \"restarts\": 12,\n      \"age\": \"2h\"\n    }\n  ]\n}",
          "permissions": 644
        },
        ".cluster_usage": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m8_l167",
    "module": "Módulo 8: SRE e Cibersegurança Internacional",
    "name": "Nível 167 — Análise Forense de Logs do Cluster",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 1500,
    "briefing": "## 🎮 Contexto do Freela\nUm incidente de segurança ocorreu na madrugada de ontem, com alteração atômica em uma chave pública criptográfica.\n\n## 🎯 Comando-Chave\n``clusterctl logs`, `grep -i \"security_violation\" cluster_events.json``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        "cluster_events.json": {
          "type": "file",
          "content": "{\"timestamp\": \"2026-06-11 02:00:15\", \"level\": \"INFO\", \"component\": \"node-manager\", \"message\": \"Node eco-node-1 heartbeat received.\"}\n{\"timestamp\": \"2026-06-11 02:05:33\", \"level\": \"WARNING\", \"component\": \"api-server\", \"message\": \"High latency on telemetry-gateway-55a2c3-1.\"}\n{\"timestamp\": \"2026-06-11 02:15:10\", \"level\": \"SECURITY_VIOLATION\", \"component\": \"audit-log\", \"message\": \"Unauthorized modification of energy_routing_key by digital signature 0xEF92A31B8C from external network.\"}\n{\"timestamp\": \"2026-06-11 02:20:00\", \"level\": \"INFO\", \"component\": \"scheduler\", \"message\": \"Scheduled telemetry-gateway-55a2c3-2 to eco-node-2.\"}",
          "permissions": 644
        },
        ".cluster_usage": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m8_l168",
    "module": "Módulo 8: SRE e Cibersegurança Internacional",
    "name": "Nível 168 — Mitigação de Ataques DDoS",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 1500,
    "briefing": "## 🎮 Contexto do Freela\nO gateway público de comunicação das usinas está sob ataque de negação de serviço distribuído (DDoS), saturando a tabela de conexões.\n\n## 🎯 Comando-Chave\n``tail -n 1000 traffic.log | awk '{print $1}' | sort | uniq -c`, `ufw deny from [IP_ATACANTE] to any``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m8_l169",
    "module": "Módulo 8: SRE e Cibersegurança Internacional",
    "name": "Nível 169 — Auditoria de Chaves SSH (Auditoria de Acessos)",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 1500,
    "briefing": "## 🎮 Contexto do Freela\nUm técnico antigo que agora trabalha para a corporação Janela OS ainda possui chaves públicas cadastradas no servidor principal.\n\n## 🎯 Comando-Chave\n`Limpeza de `/home/operator/.ssh/authorized_keys`, revogação de acessos antigos.`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".ssh": {
          "type": "dir",
          "permissions": 700
        }
      },
      "/.ssh": {
        "authorized_keys": {
          "type": "file",
          "content": "ssh-rsa AAAAB3Nza1yc2EAAAADAQABAAABAQC3operatorKeyHere... operator@ecogrid-solar.org\nssh-rsa AAAAB3Nza1yc2EAAAADAQABAAABAQC9janelaosKeyHere... admin@janelaos.com",
          "permissions": 600
        }
      }
    }
  }
];
