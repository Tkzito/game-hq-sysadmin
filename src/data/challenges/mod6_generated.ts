import { Challenge } from "../../types";

export const M6_GENERATED: Challenge[] = [
  {
    "id": "m6_l142",
    "module": "Módulo 6: Versionamento e Pipeline CI/CD",
    "name": "Nível 142 — Rastreando e Salvando Alterações",
    "actName": "Ato III: O Especialista",
    "difficulty": "easy",
    "salary": 800,
    "briefing": "## 🎮 Contexto do Freela\nVocê inicializou o repositório na TechVanguard. Agora, há dois novos arquivos importantes criados na pasta `/home/operator/api/`: `app.js` e `config.env`. Você precisa colocá-los na área de preparação (staging area) e consolidá-los no histórico do Git com um commit descritivo.\n\n## 🛠️ Missão\n1. Navegue para a pasta `/home/operator/api/`.\n2. Adicione os arquivos `app.js` e `config.env` à área de stage usando `git add`.\n3. Crie o commit contendo exatamente a mensagem:\n   `feat: setup inicial da API de pagamentos`\n   (Dica: use `git commit -m \"feat: setup inicial da API de pagamentos\"`).\n4. Certifique-se de que a área de stage fique limpa após o commit.\n\n## 🎯 Critério de Sucesso\n* O último commit no histórico da pasta `/home/operator/api` deve conter a mensagem especificada.\n* Os arquivos `app.js` e `config.env` devem estar comitados e sem modificações pendentes na working tree.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "api": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m6_l143",
    "module": "Módulo 6: Versionamento e Pipeline CI/CD",
    "name": "Nível 143 — Bifurcando Caminhos (Branches)",
    "actName": "Ato III: O Especialista",
    "difficulty": "easy",
    "salary": 800,
    "briefing": "## 🎮 Contexto do Freela\nVocê precisa implementar uma atualização nas taxas de processamento da API de pagamentos. Para não interferir na branch estável de produção (`master`), você deve isolar o desenvolvimento criando uma ramificação (branch) paralela.\n\n## 🛠️ Missão\n1. Navegue para o diretório `/home/operator/api`.\n2. Crie uma nova branch chamada `feature/taxas-api`.\n3. Mude para a branch recém-criada (ou seja, ative-a).\n   * Comandos sugeridos:\n     `git checkout -b feature/taxas-api` ou `git switch -c feature/taxas-api`\n4. Mantenha a branch ativa para que a validação verifique se ela é a HEAD atual.\n\n## 🎯 Critério de Sucesso\n* A branch ativa atual no repositório `/home/operator/api` deve ser exatamente `feature/taxas-api`.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "api": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m6_l144",
    "module": "Módulo 6: Versionamento e Pipeline CI/CD",
    "name": "Nível 144 — Mesclando Realidades (Merge)",
    "actName": "Ato III: O Especialista",
    "difficulty": "medium",
    "salary": 800,
    "briefing": "## 🎮 Contexto do Freela\nA equipe de QA testou e aprovou a branch `feature/taxas-api` contendo os novos cálculos de taxas de transação. Agora é hora de trazer essas modificações de volta para a branch de produção principal (`master`) sem perder o histórico de commits.\n\n## 🛠️ Missão\n1. Navegue para o repositório `/home/operator/api`.\n2. Mude de volta para a branch principal `master`:\n   * `git checkout master` ou `git switch master`\n3. Execute a mesclagem (merge) da branch de feature para a master:\n   * `git merge feature/taxas-api`\n4. Garanta que a mesclagem foi bem-sucedida e que as alterações estão visíveis na `master`.\n\n## 🎯 Critério de Sucesso\n* A branch ativa deve ser `master`.\n* O arquivo `app.js` na master deve conter as alterações feitas na feature (a linha contendo `TAX_RATE`).\n* O histórico de commits da branch `master` deve conter o commit feito na branch de feature.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "api": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m6_l145",
    "module": "Módulo 6: Versionamento e Pipeline CI/CD",
    "name": "Nível 145 — O Grande Conflito de Merge",
    "actName": "Ato III: O Especialista",
    "difficulty": "medium",
    "salary": 800,
    "briefing": "## 🎮 Contexto do Freela\nConflitos acontecem quando duas pessoas editam a mesma linha de um mesmo arquivo em branches diferentes. No repositório `/home/operator/api`, a branch de produção (`master`) e a branch de desenvolvimento (`feature/porta-dev`) alteraram a porta da API no arquivo `app.conf` ao mesmo tempo. Ao tentar fazer o merge, o Git travou no estado de conflito e precisa da intervenção humana para decidir o que salvar.\n\n## 🛠️ Missão\n1. Navegue para `/home/operator/api`.\n2. Abra o arquivo `app.conf` com o seu editor de texto de preferência.\n3. Localize e remova os marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`).\n4. Edite o arquivo mantendo a porta de produção configurada para **9000** (ou seja, a linha deve ficar exatamente: `PORT=9000`).\n5. Adicione o arquivo resolvido ao stage com `git add app.conf`.\n6. Finalize o processo de merge com um commit contendo exatamente a mensagem:\n   `fix: resolve conflito de porta na API`\n\n## 🎯 Critério de Sucesso\n* O conflito deve ser resolvido no arquivo `app.conf` sem deixar nenhum marcador residual.\n* O arquivo `app.conf` deve conter o valor final da porta como `9000`.\n* O merge deve ser concluído (o arquivo `.git/MERGE_HEAD` não deve existir).\n* O commit de resolução deve ser registrado com a mensagem especificada.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "api": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m6_l146",
    "module": "Módulo 6: Versionamento e Pipeline CI/CD",
    "name": "Nível 146 — Conectando Repositórios Remotos",
    "actName": "Ato III: O Especialista",
    "difficulty": "medium",
    "salary": 800,
    "briefing": "## 🎮 Contexto do Freela\nManter o código-fonte apenas no seu computador local é um grande risco de segurança. A TechVanguard contratou um servidor centralizado para armazenar os repositórios Git da corporação. Agora, precisamos conectar nosso repositório local a este repositório remoto (\"remote\") e enviar nosso histórico.\n\n## 🛠️ Missão\n1. Navegue para a pasta do repositório local em `/home/operator/api`.\n2. Adicione um repositório remoto de nome `origin` apontando para a seguinte URL corporativa:\n   `git@github.com:techvanguard/api.git`\n   * Comando: `git remote add origin git@github.com:techvanguard/api.git`\n3. Envie seus commits da branch local `master` para o repositório remoto:\n   * Comando: `git push -u origin master`\n   (Dica: Um redirecionador interno no container simulará a conexão enviando as alterações para o servidor local bare `/var/git/api.git`, então você não precisa de internet ou chaves SSH reais).\n\n## 🎯 Critério de Sucesso\n* O remote `origin` deve estar cadastrado e apontar exatamente para `git@github.com:techvanguard/api.git`.\n* A branch remota de destino deve estar perfeitamente sincronizada com a sua branch `master` local (o hash do HEAD local deve corresponder ao HEAD do servidor bare em `/var/git/api.git`).",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m6_l147",
    "module": "Módulo 6: Versionamento e Pipeline CI/CD",
    "name": "Nível 147 — O Guardião do Código (Hook pre-commit)",
    "actName": "Ato III: O Especialista",
    "difficulty": "medium",
    "salary": 800,
    "briefing": "## 🎮 Contexto do Freela\nAlguns desenvolvedores da TechVanguard continuam vazando chaves de API (`PRIVATE_KEY`) e senhas (`PASSWORD`) no repositório de testes. Para evitar vazamento de credenciais na nuvem, vamos configurar um Git Hook local que atua como um inspetor automático antes de permitir que o commit seja consolidado.\n\n## 🛠️ Missão\n1. Navegue para o repositório local em `/home/operator/api`.\n2. Crie ou edite o script no arquivo de hook local:\n   `/home/operator/api/.git/hooks/pre-commit`\n3. O script do hook deve interceptar a ação de commit e:\n   * Analisar se os arquivos adicionados para o commit contêm os termos confidenciais `PRIVATE_KEY` ou `PASSWORD`.\n   * Se algum desses termos for encontrado, imprimir um alerta e encerrar com status de erro (como `exit 1`), bloqueando o commit.\n   * Caso contrário, permitir o commit com sucesso (`exit 0`).\n4. Torne o hook executável usando `chmod +x /home/operator/api/.git/hooks/pre-commit`.\n\n## 💡 Dicas e Exemplo de Estrutura\nVocê pode criar um script simples em Bash que busca recursivamente nos arquivos indexados ou modificados:\n```bash\n#!/bin/bash\nset -euo pipefail\n\n# Buscar termos proibidos nos arquivos modificados/adicionados no stage\nif git diff --cached --name-only | xargs grep -E \"PRIVATE_KEY|PASSWORD\" > /dev/null 2>&1; then\n    echo \"ERRO: O commit contém credenciais sensíveis expostas (PRIVATE_KEY ou PASSWORD). Bloqueado!\"\n    exit 1\nfi\n\nexit 0\n```\n\n## 🎯 Critério de Sucesso\n* O hook `.git/hooks/pre-commit` deve existir no repositório do operador e ser executável.\n* Tentativas de fazer commits de arquivos que contenham a palavra `PRIVATE_KEY` ou `PASSWORD` devem ser bloqueadas pelo hook.\n* Commits normais que não possuam essas palavras-chave devem ser concluídos sem bloqueios.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "api": {
          "type": "dir",
          "permissions": 755
        }
      }
    }
  },
  {
    "id": "m6_l148",
    "module": "Módulo 6: Versionamento e Pipeline CI/CD",
    "name": "Nível 148 — Deploy Automatizado (Hook post-receive)",
    "actName": "Ato III: O Especialista",
    "difficulty": "hard",
    "salary": 800,
    "briefing": "## 🎮 Contexto do Freela\nChega de deploys via FTP! Na TechVanguard, queremos que o código seja implantado em produção automaticamente no servidor assim que um desenvolvedor fizer `git push`. Usaremos um Git Hook remoto do tipo `post-receive` que roda no servidor assim que novos pacotes de commits chegam.\n\n## 🛠️ Missão\n1. Crie ou configure o script do hook no repositório *bare* remoto do servidor:\n   `/var/git/api.git/hooks/post-receive`\n2. O script do hook deve ser executável (`chmod +x /var/git/api.git/hooks/post-receive`).\n3. Quando executado, o hook deve descompactar a versão mais recente do código diretamente no diretório do servidor web `/var/www/html`.\n4. Use o comando de checkout apontando a `--work-tree` correta:\n   `git --work-tree=/var/www/html checkout -f`\n\n## 💡 Dicas e Exemplo de Estrutura\nUm hook `post-receive` bare roda no contexto do repositório Git, então usar `--work-tree` força a extração dos arquivos de código na pasta de destino em vez da pasta Git:\n```bash\n#!/bin/bash\nset -euo pipefail\n\n# Extrair os arquivos na pasta de produção\ngit --work-tree=/var/www/html checkout -f\n```\n\n## 🎯 Critério de Sucesso\n* O hook `/var/git/api.git/hooks/post-receive` deve existir e ter permissão de execução.\n* Fazer `git push origin master` a partir do repositório local `/home/operator/api` deve disparar o hook e extrair os arquivos com sucesso para o diretório `/var/www/html`.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m6_l149",
    "module": "Módulo 6: Versionamento e Pipeline CI/CD",
    "name": "Nível 149 — Validação de Estrutura YAML (Linting)",
    "actName": "Ato III: O Especialista",
    "difficulty": "hard",
    "salary": 800,
    "briefing": "## 🎮 Contexto do Freela\nSintaxe YAML é extremamente sensível à quantidade de espaços e indentações. Um único espaço desalinhado invalida a pipeline de integração contínua (CI/CD) e impede o deploy. Para garantir o alinhamento, os desenvolvedores precisam validar seus arquivos YAML antes do commit.\n\n## 🛠️ Missão\n1. Navegue para `/home/operator/api`.\n2. Abra o arquivo de deploy `/home/operator/api/deploy.yml`.\n3. Corrija o desalinhamento e a indentação incorreta no arquivo. (Dica: o parser de YAML espera espaços de indentação consistentes).\n4. O arquivo deve passar no teste de validação sintática do Python:\n   `python3 -c \"import yaml; yaml.safe_load(open('deploy.yml'))\"`\n\n## 💡 Dicas e Exemplo de Estrutura\nO arquivo original possui este problema de indentação:\n```yaml\nversion: \"3\"\nservices:\n  api:\n    image: techvanguard/api:latest\n   ports: # <-- Apenas 3 espaços! Deveriam ser 4 espaços para alinhar com 'image'\n      - \"8080:8080\"\n```\n\nCorrija a linha do `ports:` e a lista subsequente para ficarem sob a chave do serviço correspondente.\n\n## 🎯 Critério de Sucesso\n* O arquivo `/home/operator/api/deploy.yml` deve estar estruturalmente correto.\n* O comando de validação do Python `python3 -c \"import yaml; yaml.safe_load(open('deploy.yml'))\"` deve rodar e encerrar com sucesso (sem apresentar erros de parser).",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "shell_loop",
    "hint": "",
    "initialFS": {
      "/": {
        "api": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/api": {
        "deploy.yml": {
          "type": "file",
          "content": "version: \"3\"\nservices:\n  api:\n    image: techvanguard/api:latest\n   ports:\n      - \"8080:8080\"",
          "permissions": 644
        }
      }
    }
  }
];
