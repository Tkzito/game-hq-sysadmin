import { Challenge } from "../../types";

export const M2_GENERATED: Challenge[] = [
  {
    "id": "m2_l102",
    "module": "Módulo 2: Permissões, Usuários e Segurança POSIX",
    "name": "Nível 102 — Destravando o Script do Caixa",
    "actName": "Ato I: O Despertar",
    "difficulty": "easy",
    "salary": 250,
    "briefing": "## 🎮 Contexto do Freela\nO script de fechamento do caixa (`fechar_caixa.sh`) não executa porque apresenta o erro \"Permission denied\". Adicione o bit de execução ao arquivo.\n\n## 🛠️ Missão\n1. Conceda permissão de execução ao script `fechar_caixa.sh`.\n\n## 🎯 Critério de Sucesso\n* O arquivo `/home/operator/fechar_caixa.sh` deve ter permissão de execução ativa.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "fechar_caixa.sh": {
          "type": "file",
          "content": "#!/bin/bash\necho 'Fechamento de caixa concluído.'",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m2_l103",
    "module": "Módulo 2: Permissões, Usuários e Segurança POSIX",
    "name": "Nível 103 — Blindagem Numérica",
    "actName": "Ato I: O Despertar",
    "difficulty": "easy",
    "salary": 250,
    "briefing": "## 🎮 Contexto do Freela\nO banco de dados de medicamentos está aberto a leitura e escrita por terceiros. Mude as permissões para que apenas o proprietário tenha acesso a ele.\n\n## 🛠️ Missão\n1. Restrinja o acesso para que apenas o dono possa ler e escrever em `medicamentos.db` usando o chmod em modo octal.\n\n## 🎯 Critério de Sucesso\n* O arquivo `/home/operator/medicamentos.db` deve ter permissões 600.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "medicamentos.db": {
          "type": "file",
          "content": "__BASE64__:QmFuY28gZGUgZGFkb3MgZGUgbWVkaWNhbWVudG9zCg==",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m2_l104",
    "module": "Módulo 2: Permissões, Usuários e Segurança POSIX",
    "name": "Nível 104 — Mudando de Dono",
    "actName": "Ato I: O Despertar",
    "difficulty": "medium",
    "salary": 250,
    "briefing": "## 🎮 Contexto do Freela\nO antigo SysAdmin da farmácia foi demitido. Os logs fiscais em `farmacia/` ainda pertencem a ele. Transfira a propriedade de forma recursiva para o novo `gerente`.\n\n## 🛠️ Missão\n1. Altere o dono e o grupo da pasta `farmacia` recursivamente para `gerente`.\n\n## 🎯 Critério de Sucesso\n* A pasta `/home/operator/farmacia` e seus conteúdos devem pertencer ao proprietário `gerente` e ao grupo `gerente`.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "farmacia": {
          "type": "dir",
          "permissions": 755
        }
      },
      "/farmacia": {
        "logs": {
          "type": "dir",
          "permissions": 755
        },
        "relat.txt": {
          "type": "file",
          "content": "relatorio",
          "permissions": 644
        }
      },
      "/farmacia/logs": {
        "fisc.log": {
          "type": "file",
          "content": "log 1",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m2_l105",
    "module": "Módulo 2: Permissões, Usuários e Segurança POSIX",
    "name": "Nível 105 — O Grupo Financeiro",
    "actName": "Ato I: O Despertar",
    "difficulty": "medium",
    "salary": 250,
    "briefing": "## 🎮 Contexto do Freela\nApenas o grupo `financeiro` deve poder editar a planilha de lucros. Mude o grupo do arquivo `planilha.xlsx` e as permissões.\n\n## 🛠️ Missão\n1. Altere o grupo do arquivo `planilha.xlsx` para `financeiro` e configure permissões para que apenas o dono e o grupo tenham leitura e escrita (660).\n\n## 🎯 Critério de Sucesso\n* O arquivo `/home/operator/planilha.xlsx` deve pertencer ao grupo `financeiro` e ter permissões `660`.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {
      "/": {
        "planilha.xlsx": {
          "type": "file",
          "content": "planilha financeira",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m2_l106",
    "module": "Módulo 2: Permissões, Usuários e Segurança POSIX",
    "name": "Nível 106 — O Novo Operador",
    "actName": "Ato I: O Despertar",
    "difficulty": "medium",
    "salary": 250,
    "briefing": "## 🎮 Contexto do Freela\nUm novo funcionário chamado `auxiliar` foi contratado. Você precisa criar uma conta para ele no sistema.\n\n## 🛠️ Missão\n1. Crie o novo usuário `auxiliar` no Linux.\n\n## 🎯 Critério de Sucesso\n* O usuário `auxiliar` deve estar cadastrado no sistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m2_l107",
    "module": "Módulo 2: Permissões, Usuários e Segurança POSIX",
    "name": "Nível 107 — Acesso Restrito da Impressora",
    "actName": "Ato I: O Despertar",
    "difficulty": "medium",
    "salary": 250,
    "briefing": "## 🎮 Contexto do Freela\nO usuário `auxiliar` não consegue imprimir cupons fiscais porque não tem permissão para acessar a impressora.\n\n## 🛠️ Missão\n1. Adicione o usuário `auxiliar` ao grupo administrativo de impressão `lp`.\n\n## 🎯 Critério de Sucesso\n* O usuário `auxiliar` deve pertencer ao grupo `lp`.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m2_l108",
    "module": "Módulo 2: Permissões, Usuários e Segurança POSIX",
    "name": "Nível 108 — Testando a Perspectiva",
    "actName": "Ato I: O Despertar",
    "difficulty": "hard",
    "salary": 250,
    "briefing": "## 🎮 Contexto do Freela\nVocê precisa verificar se o acesso do `auxiliar` está devidamente restrito. Troque de identidade no terminal para o usuário `auxiliar`.\n\n## 🛠️ Missão\n1. Troque a identidade do terminal para o usuário `auxiliar`.\n\n## 🎯 Critério de Sucesso\n* Uso do comando `su` para trocar de usuário para `auxiliar`.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m2_l109",
    "module": "Módulo 2: Permissões, Usuários e Segurança POSIX",
    "name": "Nível 109 — A Impressora Teimosa",
    "actName": "Ato I: O Despertar",
    "difficulty": "hard",
    "salary": 250,
    "briefing": "## 🎮 Contexto do Freela\nO serviço de impressão fiscal cups travou. Como você é o `operator`, utilize a delegação de privilégios `sudo` para reiniciar o serviço usando o comando configurado.\n\n## 🛠️ Missão\n1. Reinicie o serviço de cupons da impressora usando o comando `sudo /usr/sbin/service lp restart`.\n\n## 🎯 Critério de Sucesso\n* Execução bem-sucedida do comando de reinicialização de serviço usando `sudo`.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "security_mesh",
    "hint": "",
    "initialFS": {}
  }
];
