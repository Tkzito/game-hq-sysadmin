# MÓDULO 7: Conteinerização e Orquestração Local
## Guia de Níveis (151 a 160) — Foco: DevOps Engineer Sênior em Consultoria de Tecnologia

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

**Cidade: Neo-Recife, Porto Digital, 2047.**

A **Hodrich Digital Tech** é uma consultoria global de modernização de infraestrutura. Seus clientes enfrentam o clássico dilema corporativo: *"Na máquina do desenvolvedor funciona, mas no servidor de produção quebra."* Sistemas construídos em Python 3.8 quebram em servidores com Python 3.10; bancos de dados locais usam chaves de autenticação incompatíveis com a produção e o empacotamento de dependências é uma bagunça que atrasa deploys por semanas.

Seu papel como DevOps Engineer Sênior é implementar o isolamento hermético de ambientes. Você transformará aplicações monolíticas em contêineres Docker independentes, otimizados e orquestrados de forma limpa, garantindo que o ciclo de desenvolvimento seja idêntico ao de produção.

AURA-7 compila a ementa de objetivos:
*"Containers são unidades de computação autocontidas. Ao encapsular código, runtime e dependências em uma única imagem estática, nós eliminamos a variabilidade do ambiente hospedeiro. O Docker compose eleva isso ao próximo patamar, permitindo descrever infraestruturas completas multi-serviços em um único manifesto declarativo."*

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 151 — Invocando o Primeiro Container
- **Contexto:** A Hodrich precisa rodar um servidor de cache rápido Redis para testar latência de API.
- **Problema:** Baixar a imagem oficial do Redis do Docker Hub e iniciar o container localmente em segundo plano, listando o status e identificando o container ID.
- **Comando-Chave:** `docker run -d --name redis-cache redis`, `docker ps`
- **Critério de Sucesso:** Container ativo listado pelo Docker com o nome `redis-cache`.
- **Diálogo AURA-7:** *"O container está isolado. O Docker baixa a imagem requisitada e a inicia em um namespace de rede e processos próprio."*

#### Nível 152 — Gerenciamento de Imagens e Recursos
- **Contexto:** A equipe acumulou dezenas de imagens antigas de testes que estão consumindo todo o armazenamento do SSD de desenvolvimento.
- **Problema:** Listar as imagens existentes de forma detalhada e remover com segurança imagens obsoletas.
- **Comando-Chave:** `docker images`, `docker rmi [IMAGE_ID]`
- **Critério de Sucesso:** Liberação de espaço em disco e remoção da imagem especificada sem interromper containers ativos.
- **Diálogo AURA-7:** *"Imagens Docker são compostas de camadas imutáveis. Limpe as versões antigas para liberar armazenamento."*

#### Nível 153 — Escrevendo a Receita (Dockerfile)
- **Contexto:** Uma aplicação Node.js legada precisa ser empacotada em uma imagem leve baseada em Alpine Linux para distribuição.
- **Problema:** Criar o arquivo `Dockerfile` na raiz do projeto configurando a imagem de base, o diretório de trabalho, copiando arquivos, expondo a porta e definindo o comando padrão.
- **Comando-Chave:** `FROM alpine`, `WORKDIR /app`, `COPY . .`, `EXPOSE 3000`, `CMD ["node", "app.js"]`
- **Critério de Sucesso:** Arquivo `Dockerfile` criado com sintaxe correta e comandos mínimos para compilação.
- **Diálogo AURA-7:** *"O Dockerfile descreve a receita de construção do seu container. Use imagens base Alpine para garantir leveza e segurança."*

#### Nível 154 — Mapeamento de Portas de Comunicação
- **Contexto:** O container Node.js roda internamente na porta `3000`, mas os clientes precisam acessá-lo externamente pela porta pública `80`.
- **Problema:** Iniciar o container mapeando a porta do host para a porta interna do container.
- **Comando-Chave:** `docker run -d -p 80:3000 --name node-web app:v1`
- **Critério de Sucesso:** Acesso à porta 80 do host redirecionando o tráfego de rede HTTP para a porta 3000 do container.
- **Diálogo AURA-7:** *"Containers rodam em redes isoladas. Mapeie a porta com a flag `-p` para criar um canal do host para o container."*

#### Nível 155 — Persistência de Dados (Volumes)
- **Contexto:** Banco de dados MySQL rodando em container perde todas as informações gravadas toda vez que o container é atualizado ou reiniciado.
- **Problema:** Criar um volume e mapear um diretório do host para o banco de dados persistir dados de forma duradoura.
- **Comando-Chave:** `docker run -d -v /var/data/mysql:/var/lib/mysql --name db-mysql mysql`
- **Critério de Sucesso:** Arquivos gravados na pasta persistidos na máquina física do host mesmo após a destruição do container.
- **Diálogo AURA-7:** *"Containers são efêmeros por natureza. Para persistir arquivos importantes, utilize volumes para montá-los fora do ciclo de vida do container."*

#### Nível 156 — Injeção de Variáveis de Ambiente
- **Contexto:** A API de pagamentos se conecta a servidores de teste ou de produção dinamicamente dependendo da variável `NODE_ENV`.
- **Problema:** Iniciar o container injetando as variáveis de ambiente sem expor dados confidenciais nos arquivos de código.
- **Comando-Chave:** `docker run -d -e NODE_ENV=production -e DB_PASS=secret_key api-server`
- **Critério de Sucesso:** Aplicação rodando no container detectando a variável de ambiente injetada na inicialização.
- **Diálogo AURA-7:** *"Configure aplicações de forma limpa. Variáveis de ambiente são injetadas em tempo de execução para flexibilidade de cenários."*

#### Nível 157 — Orquestração de Multi-Serviços (Compose)
- **Contexto:** O projeto agora necessita de um frontend React, backend Node.js e banco de dados Redis rodando em conjunto no mesmo servidor.
- **Problema:** Escrever um manifesto `docker-compose.yml` que declare e conecte todos os três serviços com uma única instrução de boot.
- **Comando-Chave:** `docker compose up -d`
- **Critério de Sucesso:** Inicialização coordenada dos 3 serviços simultaneamente com criação de redes locais internas.
- **Diálogo AURA-7:** *"Não gerencie containers manualmente. O Compose centraliza a declaração e o ciclo de vida de toda a sua stack de serviços."*

#### Nível 158 — Isolamento de Redes Locais
- **Contexto:** O banco de dados Redis do Compose não pode ficar exposto publicamente na internet por questões de segurança, devendo ser visível apenas para o backend.
- **Problema:** Configurar duas redes distintas no `docker-compose.yml`: uma pública para o frontend/backend e outra rede privada de banco exclusiva para backend/database.
- **Comando-Chave:** Configuração de diretivas `networks` no manifesto docker-compose.
- **Critério de Sucesso:** Conectividade confirmada entre backend e banco, enquanto o banco rejeita conexões diretas do frontend e de IPs externos.
- **Diálogo AURA-7:** *"Isolamento de redes previne ataques de movimentação lateral. Bancos de dados devem viver em redes internas, longe do tráfego público."*

#### Nível 159 — Monitoramento e Logs de Containers
- **Contexto:** O container de processamento de filas da Hodrich está apresentando lentidão suspeita de estouro de memória e travamento.
- **Problema:** Analisar o consumo de recursos (CPU, RAM e IO) em tempo real e inspecionar logs de erros das tarefas.
- **Comando-Chave:** `docker stats`, `docker logs -f [CONTAINER_NAME]`
- **Critério de Sucesso:** Leitura e análise dos logs e fluxo de recursos em tempo real para identificação de gargalos.
- **Diálogo AURA-7:** *"Monitore de perto. O comando `docker stats` exibe a carga de hardware, permitindo identificar memory leaks antes que o container seja desligado pelo kernel."*

#### Nível 160 — [Desafio Integrado] O Orquestrador de Microsserviços
- **Contexto:** A Hodrich precisa entregar a plataforma de comércio de um grande cliente em ambiente local totalmente isolado, seguro e otimizado.
- **Missão:** Criar um arquivo `Dockerfile` leve para o backend, escrever um arquivo `docker-compose.yml` contendo os serviços `web` (backend) e `redis` (banco de cache), configurando variáveis de ambiente, portas de escuta e rede isolada de banco de dados sem expor a porta do Redis para o host.
- **Comando-Chave:** Dockerfile compilado com sucesso, redes internas configuradas em `docker-compose.yml` e orquestração de boot ativa via `docker compose up`.
- **Critério de Sucesso:** Backend respondendo HTTP público na porta 80, conectando-se ao Redis de forma interna, com persistência de logs local via volume e sem portas do Redis expostas à internet.
- **Diálogo AURA-7:** *"Arquitetura de microsserviços online e encapsulada. Sem conflitos de dependências, rede interna protegida e alta portabilidade. Você provou ser um DevOps Sênior!"*
