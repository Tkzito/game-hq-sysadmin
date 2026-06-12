import { Challenge } from "../../types";

export const M7_GENERATED: Challenge[] = [
  {
    "id": "m7_l152",
    "module": "Módulo 7: Conteinerização e Orquestração Local",
    "name": "Nível 152 — Gerenciamento de Imagens e Recursos",
    "actName": "Ato III: O Especialista",
    "difficulty": "easy",
    "salary": 1200,
    "briefing": "## 🎮 Contexto do Freela\nA equipe acumulou dezenas de imagens antigas de testes que estão consumindo todo o armazenamento do SSD de desenvolvimento.\n\n## 🎯 Comando-Chave\n``docker images`, `docker rmi [IMAGE_ID]``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".docker_state.json": {
          "type": "file",
          "content": "{\n  \"containers\": [],\n  \"images\": [\n    {\n      \"id\": \"d1a2b3c4d5e6\",\n      \"repository\": \"legacy-app\",\n      \"tag\": \"v0.1.0\",\n      \"size\": \"500MB\"\n    },\n    {\n      \"id\": \"f7a8b9c0d1e2\",\n      \"repository\": \"redis\",\n      \"tag\": \"latest\",\n      \"size\": \"113MB\"\n    }\n  ]\n}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m7_l153",
    "module": "Módulo 7: Conteinerização e Orquestração Local",
    "name": "Nível 153 — Escrevendo a Receita (Dockerfile)",
    "actName": "Ato III: O Especialista",
    "difficulty": "easy",
    "salary": 1200,
    "briefing": "## 🎮 Contexto do Freela\nUma aplicação Node.js legada precisa ser empacotada em uma imagem leve baseada em Alpine Linux para distribuição.\n\n## 🎯 Comando-Chave\n``FROM alpine`, `WORKDIR /app`, `COPY . .`, `EXPOSE 3000`, `CMD [\"node\", \"app.js\"]``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        "app.js": {
          "type": "file",
          "content": "const express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hodrich Web App - Online');\n});\n\napp.listen(port, () => {\n  console.log(`App running on port ${port}`);\n});",
          "permissions": 644
        },
        "package.json": {
          "type": "file",
          "content": "{\n  \"name\": \"hodrich-legacy-app\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Legacy node app\",\n  \"main\": \"app.js\",\n  \"dependencies\": {\n    \"express\": \"^4.17.1\"\n  }\n}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m7_l154",
    "module": "Módulo 7: Conteinerização e Orquestração Local",
    "name": "Nível 154 — Mapeamento de Portas de Comunicação",
    "actName": "Ato III: O Especialista",
    "difficulty": "medium",
    "salary": 1200,
    "briefing": "## 🎮 Contexto do Freela\nO container Node.js roda internamente na porta `3000`, mas os clientes precisam acessá-lo externamente pela porta pública `80`.\n\n## 🎯 Comando-Chave\n``docker run -d -p 80:3000 --name node-web app:v1``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".docker_state.json": {
          "type": "file",
          "content": "{\n  \"containers\": [],\n  \"images\": [\n    {\n      \"id\": \"e9a8b7c6d5e4\",\n      \"repository\": \"app\",\n      \"tag\": \"v1\",\n      \"size\": \"150MB\"\n    }\n  ]\n}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m7_l155",
    "module": "Módulo 7: Conteinerização e Orquestração Local",
    "name": "Nível 155 — Persistência de Dados (Volumes)",
    "actName": "Ato III: O Especialista",
    "difficulty": "medium",
    "salary": 1200,
    "briefing": "## 🎮 Contexto do Freela\nBanco de dados MySQL rodando em container perde todas as informações gravadas toda vez que o container é atualizado ou reiniciado.\n\n## 🎯 Comando-Chave\n``docker run -d -v /var/data/mysql:/var/lib/mysql --name db-mysql mysql``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".docker_state.json": {
          "type": "file",
          "content": "{\n  \"containers\": [],\n  \"images\": [\n    {\n      \"id\": \"a1b2c3d4e5f6\",\n      \"repository\": \"mysql\",\n      \"tag\": \"latest\",\n      \"size\": \"450MB\"\n    }\n  ]\n}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m7_l156",
    "module": "Módulo 7: Conteinerização e Orquestração Local",
    "name": "Nível 156 — Injeção de Variáveis de Ambiente",
    "actName": "Ato III: O Especialista",
    "difficulty": "medium",
    "salary": 1200,
    "briefing": "## 🎮 Contexto do Freela\nA API de pagamentos se conecta a servidores de teste ou de produção dinamicamente dependendo da variável `NODE_ENV`.\n\n## 🎯 Comando-Chave\n``docker run -d -e NODE_ENV=production -e DB_PASS=secret_key api-server``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".docker_state.json": {
          "type": "file",
          "content": "{\n  \"containers\": [],\n  \"images\": [\n    {\n      \"id\": \"a9b8c7d6e5f4\",\n      \"repository\": \"api-server\",\n      \"tag\": \"latest\",\n      \"size\": \"200MB\"\n    }\n  ]\n}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m7_l157",
    "module": "Módulo 7: Conteinerização e Orquestração Local",
    "name": "Nível 157 — Orquestração de Multi-Serviços (Compose)",
    "actName": "Ato III: O Especialista",
    "difficulty": "medium",
    "salary": 1200,
    "briefing": "## 🎮 Contexto do Freela\nO projeto agora necessita de um frontend React, backend Node.js e banco de dados Redis rodando em conjunto no mesmo servidor.\n\n## 🎯 Comando-Chave\n``docker compose up -d``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".docker_state.json": {
          "type": "file",
          "content": "{\"containers\": [], \"images\": []}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m7_l158",
    "module": "Módulo 7: Conteinerização e Orquestração Local",
    "name": "Nível 158 — Isolamento de Redes Locais",
    "actName": "Ato III: O Especialista",
    "difficulty": "hard",
    "salary": 1200,
    "briefing": "## 🎮 Contexto do Freela\nO banco de dados Redis do Compose não pode ficar exposto publicamente na internet por questões de segurança, devendo ser visível apenas para o backend.\n\n## 🎯 Comando-Chave\n`Configuração de diretivas `networks` no manifesto docker-compose.`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".docker_state.json": {
          "type": "file",
          "content": "{\"containers\": [], \"images\": []}",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m7_l159",
    "module": "Módulo 7: Conteinerização e Orquestração Local",
    "name": "Nível 159 — Monitoramento e Logs de Containers",
    "actName": "Ato III: O Especialista",
    "difficulty": "hard",
    "salary": 1200,
    "briefing": "## 🎮 Contexto do Freela\nO container de processamento de filas da Hodrich está apresentando lentidão suspeita de estouro de memória e travamento.\n\n## 🎯 Comando-Chave\n``docker stats`, `docker logs -f [CONTAINER_NAME]``\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "cluster_status",
    "hint": "",
    "initialFS": {
      "/": {
        ".docker_state.json": {
          "type": "file",
          "content": "{\n  \"containers\": [\n    {\n      \"id\": \"e4f8d9c2e0b1\",\n      \"name\": \"queue-worker\",\n      \"image\": \"worker:latest\",\n      \"status\": \"Up 5 hours (unstable)\",\n      \"ports\": \"\",\n      \"created\": \"5 hours ago\",\n      \"env\": {},\n      \"volumes\": []\n    }\n  ],\n  \"images\": [\n    {\n      \"id\": \"abc123xyz890\",\n      \"repository\": \"worker\",\n      \"tag\": \"latest\",\n      \"size\": \"320MB\"\n    }\n  ]\n}",
          "permissions": 644
        },
        ".docker_usage": {
          "type": "file",
          "content": "",
          "permissions": 644
        }
      }
    }
  }
];
