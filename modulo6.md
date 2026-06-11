# MÓDULO 6: Versionamento e Pipeline CI/CD
## Guia de Níveis (141 a 150) — Foco: DevOps Engineer em Fintech de Alto Crescimento

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

**Cidade: Neo-Sampa, Distrito Financeiro, 2047.**

Você foi contratado como DevOps Engineer na **TechVanguard** — uma fintech de meios de pagamento em rápida expansão. Toda a infraestrutura e os deploys de código da empresa eram feitos manualmente via FTP pelo antigo SysAdmin. Na semana passada, um desenvolvedor cometeu um erro de digitação ao subir um patch, substituindo um arquivo de rotas e deixando a aplicação de processamento de cartões offline por 4 horas. O prejuízo foi estimado em milhares de créditos.

A diretoria foi taxativa: *Deploys manuais estão proibidos*. A partir de hoje, tudo passa pelo controle de versão e por pipelines automatizadas. Qualquer mudança deve ser rastreada, validada sintaticamente e implantada de forma invisível.

AURA-7 processa o cenário:
*"O controle de versão é o alicerce de qualquer infraestrutura moderna. Sem Git, não há infraestrutura como código (IaC), não há automação confiável e não há segurança de auditoria. Ao integrar Git Hooks diretamente no servidor de produção, nós garantimos que o código enviado seja validado antes de ir ao ar, criando uma barreira intransponível contra o erro humano."*

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 141 — O Primeiro Commit
- **Contexto:** A TechVanguard precisa iniciar o controle de versão de sua API de pagamentos que está solta no servidor.
- **Problema:** O diretório da API não possui rastreamento. É necessário inicializar o repositório Git local e configurar a identidade do operador.
- **Comando-Chave:** `git init`, `git config --global user.name`, `git config --global user.email`
- **Critério de Sucesso:** Diretório `.git` criado e arquivo de configuração contendo nome e e-mail válidos.
- **Diálogo AURA-7:** *"Inicialize o repositório. Cada alteração a partir de agora deve carregar sua assinatura digital. Identidade é auditoria."*

#### Nível 142 — Rastreando e Salvando Alterações
- **Contexto:** Dois novos arquivos de configuração da API (`app.js` e `config.env`) foram criados. Eles precisam ser indexados e consolidados no histórico.
- **Problema:** Rastrear os arquivos criados e fazer o commit com uma mensagem descritiva padronizada.
- **Comando-Chave:** `git status`, `git add app.js config.env`, `git commit -m "feat: setup inicial da API de pagamentos"`
- **Critério de Sucesso:** Histórico do Git contendo o primeiro commit com a mensagem especificada e área de stage limpa.
- **Diálogo AURA-7:** *"Prepare os arquivos para o stage. O commit consolida o estado do seu código no tempo. Escreva mensagens claras."*

#### Nível 143 — Bifurcando Caminhos (Branches)
- **Contexto:** Uma atualização urgente nas taxas de transação precisa ser feita, mas não pode interferir no código em produção (`master`).
- **Problema:** Criar e alternar para uma branch secundária chamada `feature/taxas-api` para isolar a edição.
- **Comando-Chave:** `git branch feature/taxas-api`, `git checkout feature/taxas-api` (ou `git switch`)
- **Critério de Sucesso:** A branch ativa apontando para `feature/taxas-api`.
- **Diálogo AURA-7:** *"Branches criam realidades paralelas. Desenvolva recursos novos isoladamente e proteja a estabilidade da linha principal."*

#### Nível 144 — Mesclando Realidades (Merge)
- **Contexto:** O desenvolvimento da atualização de taxas foi concluído com sucesso e aprovado em ambiente de teste.
- **Problema:** Voltar para a branch `master` e mesclar as alterações da branch `feature/taxas-api` sem perder o histórico.
- **Comando-Chave:** `git checkout master`, `git merge feature/taxas-api`
- **Critério de Sucesso:** Código atualizado na `master` contendo o commit da branch mesclada.
- **Diálogo AURA-7:** *"Mesclar traz o futuro de volta ao presente. Traga a branch de taxas de volta para a principal de forma limpa."*

#### Nível 145 — O Grande Conflito de Merge
- **Contexto:** Dois membros do time alteraram a porta da API no mesmo arquivo `app.conf` ao mesmo tempo, gerando um conflito.
- **Problema:** Tentar fazer o merge da branch conflitante, abrir o arquivo de configuração, identificar as marcações de conflito (`<<<<<<<`, `=======`, `>>>>>>>`), resolver manualmente mantendo a porta correta de produção (`9000`) e concluir o commit de resolução.
- **Comando-Chave:** Resolver marcações de conflito no arquivo, `git add app.conf`, `git commit -m "fix: resolve conflito de porta na API"`
- **Critério de Sucesso:** Conflito resolvido sem marcadores residuais no arquivo e commit realizado na branch principal.
- **Diálogo AURA-7:** *"O Git não sabe decidir qual alteração é a correta. Esse é o seu trabalho de engenheiro. Resolva a colisão e sane o arquivo."*

#### Nível 146 — Conectando Repositórios Remotos
- **Contexto:** A TechVanguard contratou um servidor de custódia centralizado para manter o código-fonte seguro na rede corporativa.
- **Problema:** Adicionar o repositório remoto apontando para o servidor e enviar as alterações locais.
- **Comando-Chave:** `git remote add origin git@github.com:techvanguard/api.git`, `git push -u origin master`
- **Critério de Sucesso:** Repositório remoto configurado localmente e commit de upstream inicializado.
- **Diálogo AURA-7:** *"Um repositório local é vulnerável. Conecte o remote para distribuir o código e garantir redundância geográfica."*

#### Nível 147 — O Guardião do Código (Hook pre-commit)
- **Contexto:** Desenvolvedores continuam esquecendo chaves de APIs privadas e credenciais nos commits de teste.
- **Problema:** Escrever um script no arquivo `.git/hooks/pre-commit` que faça uma varredura nas linhas modificadas e bloqueie o commit caso encontre a palavra `PRIVATE_KEY` ou `PASSWORD` de forma exposta.
- **Comando-Chave:** Edição de script bash em `.git/hooks/pre-commit` retornando `exit 1` em caso de credencial encontrada.
- **Critério de Sucesso:** Hook pre-commit funcional, testado e bloqueando commits que contenham strings de chaves privadas em arquivos de stage.
- **Diálogo AURA-7:** *"Não confie na memória humana. Automatize a auditoria na origem com hooks locais. Impeça o vazamento antes que ele seja gravado."*

#### Nível 148 — Deploy Automatizado (Hook post-receive)
- **Contexto:** A equipe deseja fazer deploy em produção de forma instantânea assim que um `git push` for enviado ao servidor principal.
- **Problema:** Configurar o script `.git/hooks/post-receive` no repositório *bare* do servidor de deploy para descompactar o código diretamente no diretório de produção `/var/www/html`.
- **Comando-Chave:** Configurar Git Hook post-receive executando `git --work-tree=/var/www/html checkout -f`
- **Critério de Sucesso:** Repositório com checkout forçado executando na pasta de destino após gatilho do hook.
- **Diálogo AURA-7:** *"Com hooks remotos, o código aprovado via push torna-se código em execução instantaneamente. O deploy via FTP está oficialmente morto."*

#### Nível 149 — Validação de Estrutura YAML (Linting)
- **Contexto:** A nova pipeline de integração contínua (CI) quebra se algum desenvolvedor errar os espaços do arquivo YAML de deploys.
- **Problema:** Escrever um validador na pipeline local que verifique a sintaxe de arquivos de configuração usando ferramentas automatizadas de linting antes de permitir o merge.
- **Comando-Chave:** `yamllint deploy.yml` ou `python3 -c "import yaml; yaml.safe_load(open('deploy.yml'))"`
- **Critério de Sucesso:** Comando de linting executado com sucesso e identificando problemas de formatação antes do build.
- **Diálogo AURA-7:** *"YAML é sensível a espaços. Um caractere fora do lugar derruba a pipeline inteira. O validador é seu escudo de conformidade."*

#### Nível 150 — [Desafio Integrado] A Pipeline Inquebrável
- **Contexto:** O time de pagamentos está de mãos atadas. Um conflito de branches bloqueou o desenvolvimento, o deploy manual falhou e chaves de APIs corporativas vazaram nos logs do Git.
- **Missão:** Resolver o conflito pendente em `app.conf`, reverter a exposição de chaves privadas criando um script `pre-commit` que bloqueie vazamentos e configurar o hook `post-receive` para subir a aplicação validada no servidor de produção de forma 100% automatizada.
- **Comando-Chave:** Git revert, resolução de conflitos, configuração de hooks locais/remotos e validação automática.
- **Critério de Sucesso:** Arquivo conflitado limpo, commits com chaves bloqueados pelo hook local e atualização de master implantada no diretório `/var/www/html` automaticamente via push.
- **Diálogo AURA-7:** *"Conflitos resolvidos, chaves protegidas e deploy online sem interferência humana. A TechVanguard agora opera como uma fintech de ponta. Excelente engenharia, DevOps!"*
