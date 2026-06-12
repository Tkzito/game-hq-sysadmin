# MÓDULO 1: O Despertar do Shell
## Guia de Níveis (1 a 100) — Preparatório para Certificações Linux (LPIC-1 / LFCS)

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO
O protagonista inicia sua jornada de forma totalmente informal. Morando em Ibiúna, com uma pequena instalação solar alimentando seu computador, ele é um trabalhador autônomo (freelancer). Ele realiza pequenos serviços de suporte e configuração local para vizinhos, pequenos negócios do bairro e contatos de fóruns na internet para ganhar seus primeiros créditos e acumular conhecimento prático, equivalente às provas internacionais de certificação Linux.

---

## 🛠️ SUBMÓDULOS E CAPÍTULOS

### 🔵 SUBMÓDULO 1.1: O Despertar do Shell (Níveis 1-10)
*Foco de Certificação: LPIC-1 Tópico 103.1 (Linha de Comando)*
**Narrativa:** O operador configura seu terminal e atende o primeiro chamado de emergência de um vizinho no Bunker 7.

#### Nível 1 — O Primeiro Sinal de Vida
- **Contexto:** A tela gráfica do computador sumiu. O terminal local aguarda resposta.
- **Missão:** Enviar a mensagem "Olá, AURA" para o console.
- **Comando-Chave:** `echo "Olá, AURA"`, `clear`
- **Diálogo AURA-7:** *"Detecto prompt ativo. Olá, Operador. Use `echo` para falar comigo."*

#### Nível 2 — Onde Estou?
- **Contexto:** O terminal carregou, mas a localização atual no sistema é desconhecida.
- **Missão:** Identificar a pasta atual e ir para a pasta de usuário.
- **Comando-Chave:** `pwd`, `cd ~`
- **Diálogo AURA-7:** *"Navegação requer saber o ponto de partida. Qual é o seu diretório atual?"*

#### Nível 3 — Mapeando o Território
- **Contexto:** Identificar quais arquivos e pastas de sistema de arquivos estão ao redor.
- **Missão:** Listar os arquivos e ver seus tamanhos de forma legível.
- **Comando-Chave:** `ls -lh`
- **Diálogo AURA-7:** *"Para explorar o ambiente, use a listagem detalhada. Quais segredos estão aqui?"*

#### Nível 4 — Os Segredos Ocultos
- **Contexto:** Alguns arquivos importantes do kernel estão ocultos na pasta.
- **Missão:** Revelar os arquivos ocultos iniciados por ponto (`.`).
- **Comando-Chave:** `ls -la`
- **Diálogo AURA-7:** *"O Linux esconde configurações sob arquivos ponto. Revele-os."*

#### Nível 5 — Criando o Laboratório
- **Contexto:** É preciso criar uma estrutura de diretórios para organizar seus scripts.
- **Missão:** Criar uma pasta chamada `estudos` e um arquivo vazio `script.sh` dentro dela.
- **Comando-Chave:** `mkdir estudos`, `touch estudos/script.sh`
- **Diálogo AURA-7:** *"Organização é chave. Crie o diretório de estudos e o primeiro script."*

#### Nível 6 — A Primeira Leitura
- **Contexto:** O kernel gerou um relatório básico de diagnóstico na inicialização.
- **Missão:** Ler o conteúdo do relatório sem abrir um editor.
- **Comando-Chave:** `cat relatorio.txt`
- **Diálogo AURA-7:** *"Use `cat` para despejar o relatório na tela e inspecionar a saída."*

#### Nível 7 — O Manual Gigante
- **Contexto:** O manual do sistema operacional tem milhares de linhas. O comando `cat` rola rápido demais.
- **Missão:** Ler o manual paginando a tela e buscando por termos.
- **Comando-Chave:** `less manual.txt`
- **Diálogo AURA-7:** *"Pagine com `less`. Use `/` para pesquisar palavras e as setas para mover."*

#### Nível 8 — O Erro Mais Recente
- **Contexto:** O sistema gerou um log de erro grande, mas apenas as últimas linhas importam.
- **Missão:** Ler as últimas 20 linhas do arquivo de log.
- **Comando-Chave:** `tail -n 20 erros.log`
- **Diálogo AURA-7:** *"O final do log mostra os incidentes mais recentes. Filtre as últimas linhas."*

#### Nível 9 — O Socorro do Manual Embutido
- **Contexto:** Dúvidas sobre como usar parâmetros de comando específicos.
- **Missão:** Consultar o manual do comando `ls` e ver suas opções rápidas.
- **Comando-Chave:** `man ls`, `ls --help`
- **Diálogo AURA-7:** *"Não adivinhe parâmetros. Consulte a documentação com `man`."*

#### Nível 10 — [Desafio Prático Integrado] O Primeiro Diagnóstico
- **Contexto:** O vizinho no Bunker 7 está sem oxigênio porque as ventoinhas travaram.
- **Missão:** Investigar o diretório oculto `.bunker_config`, ler o arquivo `relatorio_pane.txt`, localizar o script de segurança `ligar_coolers.sh` e executá-lo.
- **Comando-Chave:** `ls -la`, `cd .bunker_config/sistema/scripts`, `cat ../relatorio_pane.txt`, `chmod +x ligar_coolers.sh`, `./ligar_coolers.sh`
- **Diálogo AURA-7:** *"O ar está acabando. Localize o arquivo de log oculto, descubra o caminho do script de contingência térmica e ative-o antes que os circuitos fritem!"*

---

### 🔵 SUBMÓDULO 1.2: Programas vs. Scripts & Boas Práticas (Níveis 11-20)
*Foco de Certificação: LPIC-1 Tópico 105.1 (Ambiente do Shell)*
**Narrativa:** Um amigo da faculdade pede ajuda para arrumar seus scripts experimentais que estão cheios de falhas e bugs silenciosos.

#### Nível 11 — Script ou Programa?
- **Contexto:** O script do colega roda de forma instável por falta de interpretador definido.
- **Missão:** Inserir o shebang correto (`#!/bin/bash`) no início do arquivo.
- **Comando-Chave:** `echo '#!/bin/bash' > script.sh`
- **Diálogo AURA-7:** *"O Shebang define qual interpretador lerá o script. Insira a linha mágica."*

#### Nível 12 — O Cabeçalho Profissional
- **Contexto:** Scripts profissionais precisam de metadados de identificação.
- **Missão:** Adicionar cabeçalho estruturado com autoria, licença e versão.
- **Comando-Chave:** Inserir bloco de comentários `# Autor: ...` no topo do arquivo.
- **Diálogo AURA-7:** *"Documentar o autor e o escopo do código evita dores de cabeça futuras."*

#### Nível 13 — Código Limpo e Indentação
- **Contexto:** Um script com condicionais aninhadas sem indentação está ilegível.
- **Missão:** Ajustar o recuo dos blocos condicionais para 4 espaços.
- **Comando-Chave:** Indentação estruturada com espaços.
- **Diálogo AURA-7:** *"Código sem indentação é um labirinto. Alinhe os blocos para poder ler."*

#### Nível 14 — Comentários com Propósito
- **Contexto:** Comentários repetindo o que a linha faz (`# cd para home`) poluem o código.
- **Missão:** Alterar os comentários para explicar a lógica de negócios da rotina.
- **Comando-Chave:** Reescrever comentários com foco no "porquê".
- **Diálogo AURA-7:** *"Comente a razão das decisões no código, não a sintaxe óbvia do comando."*

#### Nível 15 — Marcadores de Desenvolvimento
- **Contexto:** Partes do script do colega precisam ser melhoradas depois.
- **Missão:** Adicionar tags padronizadas `TODO` e `FIXME` para auditorias.
- **Comando-Chave:** `# TODO: Otimizar busca`
- **Diálogo AURA-7:** *"Use marcadores padrão. Analisadores estáticos buscam TODOs e FIXMEs."*

#### Nível 16 — O Histórico de Mudanças
- **Contexto:** Controlar as alterações de código diretamente no arquivo de script.
- **Missão:** Estruturar uma tabela de Changelog interna nos comentários iniciais.
- **Comando-Chave:** Comentários de histórico com datas e ações.
- **Diálogo AURA-7:** *"Histórico no arquivo ajuda a ver quem mudou o quê antes do controle de versão."*

#### Nível 17 — Variáveis Padronizadas
- **Contexto:** Variáveis globais e locais estão misturadas e colidindo no escopo.
- **Missão:** Definir variáveis locais com `local` e caixa baixa, e globais em caixa alta.
- **Comando-Chave:** `local porta=80`
- **Diálogo AURA-7:** *"Evite vazamento de escopo. Use `local` dentro de funções."*

#### Nível 18 — A Importância das Aspas
- **Contexto:** Um script quebra quando manipula arquivos com espaços no nome (ex: `meu arquivo.txt`).
- **Missão:** Envolver todas as variáveis em aspas duplas `"$VAR"`.
- **Comando-Chave:** `rm "$arquivo"`
- **Diálogo AURA-7:** *"Sem aspas, espaços quebram argumentos. Sempre use aspas na expansão."*

#### Nível 19 — Variáveis Vazias
- **Contexto:** Um comando perigoso `rm -rf $DIR/*` pode apagar a raiz se `$DIR` estiver vazia.
- **Missão:** Validar se a variável está populada antes de rodar o comando destrutivo.
- **Comando-Chave:** `[ -n "$DIR" ] && rm -rf "$DIR"/*`
- **Diálogo AURA-7:** *"Prevenir desastres é dever do programador. Valide antes de rodar o rm."*

#### Nível 20 — [Desafio Prático Integrado] Auditoria do Script do Colega
- **Contexto:** O backup de dados do seu colega está apagando arquivos errados por falha de aspas e variáveis vazias.
- **Missão:** Corrigir as permissões, padronizar variáveis e assegurar que o script não execute ações destrutivas caso as variáveis de origem estejam nulas.
- **Comando-Chave:** Correção e validação do script usando aspas, shebang e estruturas `[ -z ]`.
- **Diálogo AURA-7:** *"O script dele está instável. Limpe a estrutura, proteja as variáveis e evite que ele apague o sistema dele acidentalmente!"*

---

### 🔵 SUBMÓDULO 1.3: Manipulação de Arquivos e Busca (Níveis 21-30)
*Foco de Certificação: LPIC-1 Tópico 103.2 (Filtros de Texto) & Tópico 104.5 (Permissões)*
**Narrativa:** A papelaria do bairro precisa arquivar e localizar documentos fiscais antigos salvos em diretórios desorganizados.

#### Nível 21 — Salvando as Memórias
- **Contexto:** Fazer backup da pasta fiscal sem alterar os metadados dos arquivos originais.
- **Missão:** Copiar a pasta recursivamente preservando permissões e datas.
- **Comando-Chave:** `cp -rp`
- **Diálogo AURA-7:** *"A cópia simples altera datas de modificação. Use `-p` para preservar atributos."*

#### Nível 22 — Mover e Renomear
- **Contexto:** Documentos fiscais novos estão misturados com relatórios de vendas.
- **Missão:** Mover os relatórios para a pasta de arquivos corretos.
- **Comando-Chave:** `mv relatorio_*.txt backup/`
- **Diálogo AURA-7:** *"Mova arquivos com precisão de destino. Agrupe usando wildcards."*

#### Nível 23 — Remoção Cirúrgica
- **Contexto:** Arquivos de lixo temporário estão ocupando espaço precioso na pasta.
- **Missão:** Deletar apenas arquivos com extensões `.tmp` e `.bak`.
- **Comando-Chave:** `rm *.tmp *.bak`
- **Diálogo AURA-7:** *"Seja cirúrgico com o rm. Selecione as extensões de resíduo."*

#### Nível 24 — Limpeza de Estrutura
- **Contexto:** Pastas vazias deixadas pela desorganização dificultam a navegação.
- **Missão:** Remover diretórios vazios com segurança e apagar pastas antigas em lote.
- **Comando-Chave:** `rmdir pasta_vazia`, `rm -rf pasta_antiga`
- **Diálogo AURA-7:** *"`rmdir` falha se houver arquivos. Para pastas cheias obsoletas, use `rm -rf`."*

#### Nível 25 — Atalhos do Sistema
- **Contexto:** O dono do comércio precisa acessar um relatório fiscal aninhado sem navegar por caminhos longos.
- **Missão:** Criar um link simbólico na pasta home apontando para o relatório aninhado.
- **Comando-Chave:** `ln -s /caminho/longo/relatorio.txt ~/atalho.txt`
- **Diálogo AURA-7:** *"Links simbólicos agilizam caminhos. Use a opção `-s`."*

#### Nível 26 — Empacotando Dados
- **Contexto:** A contabilidade precisa de um único arquivo contendo toda a pasta fiscal do ano.
- **Missão:** Criar um arquivo tar simples contendo a pasta de relatórios.
- **Comando-Chave:** `tar -cf backup.tar relatorios/`
- **Diálogo AURA-7:** *"Empacote sem comprimir primeiro. O arquivo `.tar` apenas junta arquivos."*

#### Nível 27 — Compressão Combinada
- **Contexto:** Enviar arquivos pela rede requer reduzir seu tamanho ao máximo.
- **Missão:** Empacotar e comprimir usando algoritmo gzip.
- **Comando-Chave:** `tar -czf backup.tar.gz relatorios/`
- **Diálogo AURA-7:** *"Combine tar e gzip em uma única etapa usando a opção `-z`."*

#### Nível 28 — Compressores de Alta Performance
- **Contexto:** Logs históricos gigantescos precisam ser compactados individualmente sem empacotamento.
- **Missão:** Comprimir logs históricos com `gzip` e ler sem descompactar.
- **Comando-Chave:** `gzip log_antigo.log`, `zcat log_antigo.log.gz`
- **Diálogo AURA-7:** *"`gzip` comprime o arquivo in-place. Use `zcat` para ler sem alterar o disco."*

#### Nível 29 — A Busca Recursiva
- **Contexto:** Um arquivo de nota fiscal sumiu em algum subdiretório do disco de backup.
- **Missão:** Localizar o arquivo pelo nome de forma recursiva.
- **Comando-Chave:** `find /backup -name "nota_*.txt"`
- **Diálogo AURA-7:** *"`find` varre a árvore física de diretórios. Busque por padrões."*

#### Nível 30 — [Desafio Prático Integrado] O Resgate de Backups
- **Contexto:** A papelaria precisa do backup consolidado e limpo enviado para o e-mail do gerente.
- **Missão:** Encontrar todas as planilhas fiscais `.csv` modificadas nos últimos 15 dias, copiá-las para a pasta `envio`, compactar a pasta em `.tar.gz` e criar um link simbólico de atalho na raiz do usuário.
- **Comando-Chave:** `find /var/docs -name "*.csv" -mtime -15 -exec cp {} ~/envio/ \;`, `tar -czf ~/envio.tar.gz ~/envio`, `ln -s ~/envio.tar.gz ~/link_backup`
- **Diálogo AURA-7:** *"O tempo urge. Varra os discos fiscais, isole as planilhas recentes, comprima e monte o link para o envio!"*

---

### 🔵 SUBMÓDULO 1.4: Depuração e Diagnósticos de Código (Níveis 31-40)
*Foco de Certificação: LPIC-1 Tópico 105.2 (Scripts Simples)*
**Narrativa:** A lojinha online de roupas do bairro está com scripts de cálculo de frete apresentando falhas silenciosas e intermitentes.

#### Nível 31 — Verificação Passiva
- **Contexto:** Modificar um script crítico sem correr o risco de subir erros básicos de escrita e sintaxe.
- **Missão:** Validar a gramática do script sem executá-lo de fato.
- **Comando-Chave:** `bash -n script_frete.sh`
- **Diálogo AURA-7:** *"`-n` valida tokens de sintaxe sem rodar o código. Útil antes de commits."*

#### Nível 32 — Depuração com Rastro Simples
- **Contexto:** Identificar se uma variável de imposto está recebendo o valor correto no meio da execução.
- **Missão:** Injetar marcas de log com o valor da variável de teste.
- **Comando-Chave:** `echo "DEBUG: valor da taxa=$taxa"`
- **Diálogo AURA-7:** *"Rastrear com `echo` é o debug mais rápido. Monitore o estado das variáveis."*

#### Nível 33 — Rastreamento de Execução Global
- **Contexto:** O script de frete roda sem erro, mas o cálculo final do frete está incorreto.
- **Missão:** Executar o script imprimindo todos os comandos e expansões em tempo real.
- **Comando-Chave:** `bash -x script_frete.sh`
- **Diálogo AURA-7:** *"A flag `-x` (xtrace) mostra cada linha expandida e executada pelo shell."*

#### Nível 34 — Rastreamento por Leitura de Linhas
- **Contexto:** Entender o fluxo de leitura do interpretador antes da avaliação das expressões.
- **Missão:** Rodar o script exibindo as linhas exatamente como foram escritas no código.
- **Comando-Chave:** `bash -v script_frete.sh`
- **Diálogo AURA-7:** *"A flag `-v` (verbose) imprime as linhas do script conforme são lidas."*

#### Nível 35 — Depuração Setorizada
- **Contexto:** O script tem 500 linhas. Depurar globalmente gera logs gigantes e confusos.
- **Missão:** Ativar o rastro apenas no bloco lógico do cálculo do frete.
- **Comando-Chave:** Inserir `set -x` antes e `set +x` depois do bloco.
- **Diálogo AURA-7:** *"Isole a depuração. Ligue com `set -x` e desligue com `set +x` no ponto crítico."*

#### Nível 36 — Depuração Baseada em Níveis
- **Contexto:** Manter funções de debug no script de produção sem poluir a tela do usuário comum.
- **Missão:** Criar uma função de depuração condicional controlada por variável de ambiente.
- **Comando-Chave:** `[ "$DEBUG" = "1" ] && echo "DEBUG: ..."`
- **Diálogo AURA-7:** *"Código profissional traz debug desligável. Controle com variáveis."*

#### Nível 37 — Tratamento de Retorno
- **Contexto:** Um script continua rodando comandos mesmo após a falha de um utilitário inicial (ex: banco offline).
- **Missão:** Capturar o código de saída de um comando e abortar se for diferente de zero.
- **Comando-Chave:** `comando`, `[ $? -ne 0 ] && exit 1`
- **Diálogo AURA-7:** *"`$?` armazena o status de retorno do último processo. Valide-o sempre."*

#### Nível 38 — Pausa Interativa
- **Contexto:** O loop está rodando rápido demais para analisar o estado das pastas temporárias.
- **Missão:** Pausar a execução do script após a execução de cada passo.
- **Comando-Chave:** `read -p "Pressione Enter para continuar..."`
- **Diálogo AURA-7:** *"Introduza travas interativas com `read` para inspecionar diretórios em runtime."*

#### Nível 39 — Perigos do Eval
- **Contexto:** O script do colega usa strings dinâmicas gerando vulnerabilidade de injeção.
- **Missão:** Substituir um comando com `eval` por expansão segura do shell.
- **Comando-Chave:** Substituição de `eval "$cmd"` por invocação direta.
- **Diálogo AURA-7:** *"`eval` executa strings. Se o input for externo, é uma falha grave. Evite."*

#### Nível 40 — [Desafio Prático Integrado] O Bug do Cálculo de Frete
- **Contexto:** A loja de roupas está perdendo vendas porque o script de frete entra em loop infinito quando o peso da carga é zero.
- **Missão:** Depurar o script usando rastro setorizado, identificar a linha do loop e adicionar validação de código de retorno para impedir cálculos com valores inválidos.
- **Comando-Chave:** Corrigir script de cálculo de frete validando a entrada com condicionais e tratando o `exit status`.
- **Diálogo AURA-7:** *"O sistema de frete está paralisado. Use o debug, encontre o loop mal-escrito e adicione a trava de segurança!"*

---

### 🔵 SUBMÓDULO 1.5: Argumentos, Chaves e Opções CLI (Níveis 41-50)
*Foco de Certificação: LPIC-1 Tópico 103.1 (Uso da Linha de Comando)*
**Narrativa:** O operador cria uma ferramenta interativa de linha de comando para ajudar um grupo local de RPG a consultar fichas de personagens.

#### Nível 41 — Argumentos Posicionais
- **Contexto:** Capturar o nome do personagem passado diretamente após o nome do script.
- **Missão:** Ler o primeiro e o segundo argumento passados via CLI.
- **Comando-Chave:** `$1`, `$2`
- **Diálogo AURA-7:** *"Parâmetros após o script populam as variáveis posicionais de `$1` a `$9`."*

#### Nível 42 — Contador de Argumentos
- **Contexto:** O script quebra se o usuário não passar todos os dados necessários.
- **Missão:** Verificar se a quantidade de argumentos passados é igual a 2.
- **Comando-Chave:** `if [ $# -lt 2 ]; then ... fi`
- **Diálogo AURA-7:** *"`$#` contém a quantidade total de parâmetros passados. Valide o limite."*

#### Nível 43 — A Lista de Argumentos
- **Contexto:** É preciso imprimir uma lista com todas as perícias fornecidas na linha de comando.
- **Missão:** Iterar sobre a lista completa de argumentos fornecidos.
- **Comando-Chave:** `"$@"` (iterável preservando espaços de argumentos)
- **Diálogo AURA-7:** *"Use `"$@"` para listar parâmetros individualmente sem quebrar nomes compostos."*

#### Nível 44 — Deslocamento de Parâmetros
- **Contexto:** Processar argumentos de forma sequencial limpando a fila para o próximo.
- **Missão:** Consumir o argumento `$1` e mover os argumentos restantes.
- **Comando-Chave:** `shift`
- **Diálogo AURA-7:** *"`shift` move as posições à esquerda. `$2` torna-se `$1`."*

#### Nível 45 — Loop Manual de Opções
- **Contexto:** Desenvolver um analisador simples de opções de terminal.
- **Missão:** Processar flags básicas (ex: `-a` ou `-b`) usando laço e escolhas.
- **Comando-Chave:** `while`, `case`, `shift`
- **Diálogo AURA-7:** *"Combine loop e `case` para criar um analisador manual de argumentos simples."*

#### Nível 46 — Tela de Ajuda Padronizada
- **Contexto:** A ferramenta precisa documentar suas opções de uso caso o usuário precise de apoio.
- **Missão:** Criar uma função de ajuda profissional ativada por `-h` e `--help`.
- **Comando-Chave:** Invocação de função `exibir_ajuda()` com saída estruturada.
- **Diálogo AURA-7:** *"Uma boa ferramenta documenta a si mesma. Mapeie a saída de ajuda."*

#### Nível 47 — Versão do Utilitário
- **Contexto:** Rastrear a versão ativa da ferramenta instalada nas máquinas dos jogadores de RPG.
- **Missão:** Configurar a exibição da versão do script através do parâmetro `-V` ou `--version`.
- **Comando-Chave:** Exibição dinâmica de versão em metadados.
- **Diálogo AURA-7:** *"Informe a versão do software de forma limpa quando solicitado."*

#### Nível 48 — O Analisador Getopts
- **Contexto:** Opções compostas no padrão Unix (ex: `-k -v` ou `-kv`) quebram analisadores manuais simples.
- **Missão:** Utilizar a ferramenta nativa do shell para validar opções.
- **Comando-Chave:** `while getopts "ab:" opcao; do ... done`
- **Diálogo AURA-7:** *"`getopts` é o padrão POSIX para processar chaves curtas e seus argumentos."*

#### Nível 49 — Validação de Argumentos com Getopts
- **Contexto:** Capturar argumentos atrelados a flags (ex: `-c Guerreiro`) e tratar erros de entrada.
- **Missão:** Processar a opção do `getopts` que exige um argumento extra.
- **Comando-Chave:** `OPTARG` no loop de avaliação do `getopts`.
- **Diálogo AURA-7:** *"`OPTARG` guarda o valor associado à flag de opção atual. Use-o no loop."*

#### Nível 50 — [Desafio Prático Integrado] O Consulta-RPG CLI
- **Contexto:** A ferramenta de RPG precisa estar pronta para distribuição.
- **Missão:** Criar o script `rpg_consult.sh` aceitando as opções `-h` (ajuda), `-v` (versionamento), `-p [nome]` (ficha do personagem) e `-c` (mostra dados da campanha), rejeitando qualquer flag desconhecida.
- **Comando-Chave:** Implementar loop `getopts "hvp:c" option` completo com tratamento de erros de sintaxe.
- **Diálogo AURA-7:** *"A mesa de jogo está pronta. Consolide a recepção de parâmetros e estruture a CLI de consulta!"*

---

### 🔵 SUBMÓDULO 1.6: Expressões Regulares - Regex (Níveis 51-60)
*Foco de Certificação: LPIC-1 Tópico 103.7 (Expressões Regulares)*
**Narrativa:** Um consultório odontológico local precisa validar e sanitizar uma lista antiga e bagunçada de e-mails e telefones de pacientes.

#### Nível 51 — Introdução ao Casamento
- **Contexto:** Entender a diferença entre a busca de strings literais e curingas dinâmicos.
- **Missão:** Localizar termos ignorando a posição em que se encontram no texto.
- **Comando-Chave:** `grep`
- **Diálogo AURA-7:** *"Casamento de padrões busca estruturas dinâmicas, não apenas letras fixas."*

#### Nível 52 — Âncoras de Linha
- **Contexto:** Filtrar registros de logs que comecem ou terminem com palavras de auditoria.
- **Missão:** Casar padrões apenas se estiverem no início da linha ou no fim dela.
- **Comando-Chave:** `^` (início), `$` (fim)
- **Diálogo AURA-7:** *"Âncoras definem a posição. `^` trava no começo e `$` trava no encerramento."*

#### Nível 53 — Listas e Faixas
- **Contexto:** Localizar registros que contêm caracteres especiais ou dígitos em locais específicos.
- **Missão:** Buscar por um intervalo numérico ou rejeitar caracteres específicos.
- **Comando-Chave:** colchetes `[0-9]`, `[^a-zA-Z]`
- **Diálogo AURA-7:** *"Colchetes criam grupos. Use `^` dentro do colchete para negar a lista."*

#### Nível 54 — O Ponto Curinga
- **Contexto:** Localizar padrões que possuem variação de caracteres em uma posição fixa.
- **Missão:** Buscar padrões usando o curinga de caractere único.
- **Comando-Chave:** ponto `.`
- **Diálogo AURA-7:** *"O ponto casa qualquer caractere. Para buscar ponto literal, use barra `\.`."*

#### Nível 55 — O Curinga Guloso
- **Contexto:** Filtrar strings longas, mas com risco de casar mais dados do que o esperado.
- **Missão:** Casar tudo o que existir entre duas palavras-chave.
- **Comando-Chave:** `.*`
- **Diálogo AURA-7:** *"A combinação de ponto e asterisco consome tudo até a última ocorrência."*

#### Nível 56 — Quantificadores de Precisão
- **Contexto:** Validar números de telefone que precisam ter uma quantidade exata de dígitos.
- **Missão:** Filtrar registros com repetição exata ou dentro de um limite.
- **Comando-Chave:** chaves `{n}`, `{n,m}`
- **Diálogo AURA-7:** *"Chaves definem limites de repetição. Especifique min e max de repetições."*

#### Nível 57 — Alternância Lógica
- **Contexto:** Buscar por mais de um termo alternativo em uma mesma expressão (ex: `azul` ou `verde`).
- **Missão:** Criar uma expressão regular com escolha lógica.
- **Comando-Chave:** `|`
- **Diálogo AURA-7:** *"O caractere pipe `|` atua como operador OR em regex estendida."*

#### Nível 58 — Repetidores Básicos
- **Contexto:** Buscar ocorrências opcionais ou repetitivas de letras em palavras de cadastro.
- **Missão:** Casar padrões com ocorrências do tipo zero ou mais, um ou mais, e opcional.
- **Comando-Chave:** `*` (zero ou mais), `+` (um ou mais), `?` (opcional)
- **Diálogo AURA-7:** *"Controle repetições. `+` exige ao menos um, e `?` torna o caractere opcional."*

#### Nível 59 — Regex Estendida
- **Contexto:** Usar metacaracteres avançados sem precisar escapar a barra invertida em todos eles.
- **Missão:** Executar buscas complexas usando o motor estendido de regex do sistema.
- **Comando-Chave:** `grep -E`, `egrep`
- **Diálogo AURA-7:** *"`-E` ativa expressões regulares estendidas no grep. Evita o excesso de escapes."*

#### Nível 60 — [Desafio Prático Integrado] Higienização de Pacientes
- **Contexto:** O consultório precisa enviar avisos de consulta, mas a lista de contatos contém dados corrompidos.
- **Missão:** Filtrar o arquivo `cadastro.txt` e salvar em `limpo.txt` apenas linhas com e-mails válidos (padrão `usuario@dominio.com`) e telefones com código de área (padrão `(XX)9XXXX-XXXX`).
- **Comando-Chave:** `grep -E "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$" cadastro.txt > limpo.txt`
- **Diálogo AURA-7:** *"Dados sujos impedem o envio automático. Escreva a regex definitiva, limpe o cadastro e salve o envio!"*

---

### 🔵 SUBMÓDULO 1.7: Arquivos de Configuração e Escopo (Níveis 61-70)
*Foco de Certificação: LPIC-1 Tópico 105.1 (Personalização do Ambiente)*
**Narrativa:** Um pequeno estúdio de gravação de áudio do bairro precisa automatizar perfis de som lendo e gravando arquivos de configuração.

#### Nível 61 — Formatos de Configuração
- **Contexto:** Compreender a estrutura de arquivos de configurações padrões e seus delimitadores.
- **Missão:** Identificar chaves e valores separados por sinal de igual ou dois pontos.
- **Comando-Chave:** Ler arquivos do tipo `porta=8080` e `modo:stereo`.
- **Diálogo AURA-7:** *"Arquivos de configuração do sistema usam delimitadores simples. Estude o formato."*

#### Nível 62 — Leitura Linha por Linha
- **Contexto:** É preciso processar o arquivo de configuração de forma iterativa no shell.
- **Missão:** Escrever um laço para ler cada linha do arquivo de texto de forma isolada.
- **Comando-Chave:** `while read -r linha; do ... done < arquivo`
- **Diálogo AURA-7:** *"O loop `read` é a forma mais estável de processar texto linha por linha."*

#### Nível 63 — Desprezando Comentários
- **Contexto:** Arquivos de configuração profissional contêm linhas em branco e comentários explicativos.
- **Missão:** Filtrar a leitura do script ignorando linhas vazias ou iniciadas por `#`.
- **Comando-Chave:** `[[ -z "$linha" || "$linha" =~ ^# ]] && continue`
- **Diálogo AURA-7:** *"Comentários e linhas vazias são ruídos de leitura. Ignore-os no loop."*

#### Nível 64 — Divisão de Strings
- **Contexto:** Extrair chaves e valores a partir da linha de configuração limpa.
- **Missão:** Usar utilitários para quebrar a string no delimitador e armazenar em variáveis.
- **Comando-Chave:** `chave=$(echo "$linha" | cut -d'=' -f1)`
- **Diálogo AURA-7:** *"Separe a chave do valor usando `cut` com delimitador apropriado."*

#### Nível 65 — Limpeza de Espaços
- **Contexto:** Arquivos de texto editados manualmente contêm espaços invisíveis que impedem a validação.
- **Missão:** Remover espaços em branco residuais no início ou final das strings extraídas.
- **Comando-Chave:** `valor=$(echo "$valor" | tr -d ' ')`
- **Diálogo AURA-7:** *"Espaços em branco quebram validações de string. Limpe-os com `tr` ou `sed`."*

#### Nível 66 — Perigos do Source
- **Contexto:** Fazer `source config.conf` lê as variáveis rápido, mas executa qualquer comando malicioso no arquivo.
- **Missão:** Entender o risco de injeção de código e rejeitar o uso do source em ambientes inseguros.
- **Comando-Chave:** Evitar `source` ou `.` para arquivos editáveis por usuários comuns.
- **Diálogo AURA-7:** *"`source` executa código. Se o usuário injetar um comando lá dentro, seu script roda."*

#### Nível 67 — Parser Genérico
- **Contexto:** Reutilizar a leitura de arquivos de configuração em múltiplos scripts do estúdio.
- **Missão:** Escrever uma função modular que receba o nome do arquivo e retorne as chaves.
- **Comando-Chave:** Estrutura de função `ler_configuracao()` recebendo argumento de caminho.
- **Diálogo AURA-7:** *"Modularize. Crie um parser reaproveitável em forma de função."*

#### Nível 68 — Edição In-Place
- **Contexto:** É preciso salvar alterações nas portas do mixer diretamente no arquivo conf sem recriá-lo.
- **Missão:** Atualizar o valor de uma chave específica in-place usando sed.
- **Comando-Chave:** `sed -i "s/^porta=.*/porta=9090/" config.conf`
- **Diálogo AURA-7:** *"`sed -i` altera o arquivo direto no disco. Substitua chaves com segurança."*

#### Nível 69 — Variáveis de Ambiente
- **Contexto:** Exportar parâmetros de áudio no escopo global para que outros processos os vejam.
- **Missão:** Configurar variáveis globais de ambiente que durem além do script atual.
- **Comando-Chave:** `export AUDIO_PATH="/var/media"`
- **Diálogo AURA-7:** *"`export` joga a variável na tabela de ambiente dos processos filhos."*

#### Nível 70 — [Desafio Prático Integrado] O Perfil de Áudio do Estúdio
- **Contexto:** O mixer de som do estúdio não consegue inicializar porque a porta de rede está errada nas configurações.
- **Missão:** Desenvolver um script que leia `audio.conf`, ignore comentários, encontre a chave `PORT`, mude o valor para `9090` diretamente no arquivo de forma segura, e faça export de `MIXER_STATUS=ACTIVE`.
- **Comando-Chave:** Parser manual de chaves, `sed -i` para atualizar e `export` de variável de ambiente.
- **Diálogo AURA-7:** *"O estúdio está em silêncio. Leia o arquivo de canais, modifique a porta in-place e exporte a flag do mixer!"*

---

### 🔵 SUBMÓDULO 1.8: Redirecionamentos, Descritores e Pipes (Níveis 71-80)
*Foco de Certificação: LPIC-1 Tópico 103.4 (Streams, Pipes e Redirecionamentos)*
**Narrativa:** A contabilidade do mercadinho local precisa consolidar vendas e desviar logs de erros de maquininhas de cartão.

#### Nível 71 — Saída Padrão
- **Contexto:** Criar um arquivo permanente com a lista de transações limpas do dia.
- **Missão:** Direcionar a saída de um comando de transações para um arquivo de texto.
- **Comando-Chave:** `comando > vendas.txt`
- **Diálogo AURA-7:** *"`>` redireciona o fluxo `stdout` (descritor 1) recriando o destino."*

#### Nível 72 — Anexar Fluxos
- **Contexto:** Adicionar novas transações ao final do relatório diário sem apagar as antigas.
- **Missão:** Redirecionar dados para o final de um arquivo de texto preservando o conteúdo.
- **Comando-Chave:** `comando >> vendas.txt`
- **Diálogo AURA-7:** *"`>>` anexa dados no final do fluxo sem truncar o arquivo."*

#### Nível 73 — Capturando Erros
- **Contexto:** Maquininhas de cartão offline geram erros que poluem a listagem de vendas.
- **Missão:** Desviar os erros de terminal para um arquivo exclusivo de depuração.
- **Comando-Chave:** `comando 2> erros_vendas.log`
- **Diálogo AURA-7:** *"Erros trafegam no fluxo `stderr` (descritor 2). Redirecione usando `2>`."*

#### Nível 74 — Fusão de Canais
- **Contexto:** Descartar mensagens irrelevantes do sistema ou juntar erros e saídas no mesmo log.
- **Missão:** Silenciar saídas e erros enviando tudo para o lixo do sistema.
- **Comando-Chave:** `comando > /dev/null 2>&1`
- **Diálogo AURA-7:** *"`2>&1` direciona o canal de erro para o canal de saída padrão."*

#### Nível 75 — Encadeamento com Pipes
- **Contexto:** Filtrar dados diretamente da saída de um comando sem salvar arquivos temporários em disco.
- **Missão:** Enviar a saída de um comando como entrada do próximo na fila.
- **Comando-Chave:** `comando1 | comando2`
- **Diálogo AURA-7:** *"O pipe `|` une o `stdout` do primeiro ao `stdin` do segundo. Fluxo dinâmico."*

#### Nível 76 — Filtragem e Busca Inversa
- **Contexto:** Excluir transações de teste (contendo a palavra `TESTE`) do fechamento fiscal.
- **Missão:** Filtrar registros de texto excluindo linhas com termos específicos.
- **Comando-Chave:** `grep -v "TESTE"`
- **Diálogo AURA-7:** *"Use a opção `-v` do grep para realizar buscas invertidas e rejeitar linhas."*

#### Nível 77 — Ordenação de Registros
- **Contexto:** O contador precisa analisar as transações ordenadas de forma decrescente por valor.
- **Missão:** Ordenar linhas de um arquivo em ordem numérica reversa.
- **Comando-Chave:** `sort -nr`
- **Diálogo AURA-7:** *"`sort` organiza texto. `-n` ativa ordenação numérica e `-r` inverte a ordem."*

#### Nível 78 — Remoção de Redundâncias
- **Contexto:** O sistema de cartão registrou transações duplicadas consecutivas por oscilação de rede.
- **Missão:** Filtrar e eliminar linhas repetidas idênticas e consecutivas.
- **Comando-Chave:** `uniq`, `uniq -c` (conta ocorrências)
- **Diálogo AURA-7:** *"`uniq` remove redundâncias consecutivas. Combine com `sort` primeiro para dados gerais."*

#### Nível 79 — Contadores Rápidos
- **Contexto:** Saber a quantidade exata de vendas aprovadas no dia para cruzamento de dados.
- **Missão:** Contar o número de linhas resultantes da filtragem de vendas.
- **Comando-Chave:** `wc -l`
- **Diálogo AURA-7:** *"`wc -l` realiza a contagem de quebras de linha no fluxo fornecido."*

#### Nível 80 — [Desafio Prático Integrado] O Fechamento de Caixa
- **Contexto:** O fechamento fiscal do mercadinho está travado por dados poluídos das transações de hoje.
- **Missão:** Ler o arquivo `transacoes.log`, filtrar apenas vendas de cartões de débito/crédito, ordenar decrescentemente pelo valor, remover transações duplicadas, desviar erros de maquininha para `erros.log` e gerar o arquivo fiscal final `vendas_aprovadas.txt` com a quantidade de vendas no cabeçalho.
- **Comando-Chave:** Encadeamento de `grep`, `sort`, `uniq`, `wc` e redirecionadores de descritores.
- **Diálogo AURA-7:** *"O caixa está fechando. Processe o log bruto, jogue erros no descarte e gere o relatório fiscal unificado!"*

---

### 🔵 SUBMÓDULO 1.9: Banco de Dados Textual (Níveis 81-90)
*Foco de Certificação: LPIC-1 Tópico 103.2 (Filtros de Texto)*
**Narrativa:** O mercadinho precisa de um cadastro autônomo e simples para controle de estoque de produtos sem bancos de dados pesados.

#### Nível 81 — Tabelas em Texto
- **Contexto:** Entender a viabilidade de usar arquivos planos estruturados para persistir dados.
- **Missão:** Criar a estrutura inicial de colunas separadas por delimitadores.
- **Comando-Chave:** Criação de arquivo CSV/TSV simples.
- **Diálogo AURA-7:** *"Arquivos planos podem atuar como tabelas de bancos de dados. Planeje a estrutura."*

#### Nível 82 — Delimitadores de Coluna
- **Contexto:** Escolher o caractere delimitador que impeça conflitos com dados textuais comuns.
- **Missão:** Inserir dados delimitados por dois pontos `:` para garantir compatibilidade.
- **Comando-Chave:** `echo "1:Arroz:30:5.50" >> estoque.txt`
- **Diálogo AURA-7:** *"Dois pontos `:` é um delimitador clássico em arquivos de sistema Linux. Use-o."*

#### Nível 83 — Chaves Primárias Incrementais
- **Contexto:** Cada produto no estoque precisa de um ID numérico único incremental gerado automaticamente.
- **Missão:** Calcular o maior ID atual no arquivo e somar 1 para o novo registro.
- **Comando-Chave:** `proximo_id=$(($(tail -n 1 estoque.txt | cut -d':' -f1) + 1))`
- **Diálogo AURA-7:** *"Descubra o último ID registrado, incremente em shell e garanta a chave primária."*

#### Nível 84 — Inserção Estruturada
- **Contexto:** Garantir que o script não salve registros com campos vazios ou formatos inválidos.
- **Missão:** Escrever uma função de validação de campos antes de anexar no arquivo.
- **Comando-Chave:** Validação condicional `[ -n "$nome" ] && [ -n "$qtd" ]`
- **Diálogo AURA-7:** *"Dados inconsistentes corrompem a tabela. Valide todos os campos antes de persistir."*

#### Nível 85 — Consultas por ID
- **Contexto:** Buscar dados de um único produto de forma rápida para alteração.
- **Missão:** Filtrar a linha correspondente ao ID e extrair seus campos.
- **Comando-Chave:** `grep "^$id:" estoque.txt`
- **Diálogo AURA-7:** *"Use a âncora `^` no grep junto com o ID para garantir busca exata na chave."*

#### Nível 86 — Exclusão Física
- **Contexto:** Um produto saiu de linha e precisa ser removido permanentemente do cadastro.
- **Missão:** Remover a linha do produto preservando todos os outros registros.
- **Comando-Chave:** `grep -v "^$id:" estoque.txt > temp.txt && mv temp.txt estoque.txt`
- **Diálogo AURA-7:** *"Exclua filtrando de forma inversa e sobrescrevendo o arquivo com segurança."*

#### Nível 87 — Atualização Parcial
- **Contexto:** Alterar o preço de um produto específico sem alterar os outros dados da linha.
- **Missão:** Substituir a linha inteira correspondente ao ID pelo novo registro montado.
- **Comando-Chave:** `sed -i "s/^$id:.*/$id:$novo_registro/" estoque.txt`
- **Diálogo AURA-7:** *"`sed` com âncora localiza e atualiza toda a linha de registro da chave."*

#### Nível 88 — O Script Controlador
- **Contexto:** Centralizar as funções CRUD do banco textual em uma única ferramenta administrativa.
- **Missão:** Criar o script `bantex.sh` recebendo ações (inserir, listar, deletar).
- **Comando-Chave:** Integração de funções bash em script modular.
- **Diálogo AURA-7:** *"Centralize. Mapeie as funções de manipulação em um único script estruturado."*

#### Nível 89 — Prevenção de Concorrência
- **Contexto:** Duas pessoas tentando escrever no estoque ao mesmo tempo corrompem o arquivo.
- **Missão:** Implementar exclusão mútua usando diretórios de lock do sistema operacional.
- **Comando-Chave:** `mkdir /tmp/estoque.lock 2>/dev/null` para criar bloqueio ativo.
- **Diálogo AURA-7:** *"`mkdir` é atômico. Se o lock falhar, espere até a liberação do arquivo."*

#### Nível 90 — [Desafio Prático Integrado] O Estoque do Mercadinho
- **Contexto:** O dono do mercadinho precisa da ferramenta operacional para o estoque de produtos.
- **Missão:** Desenvolver o script `estoque.sh` suportando os comandos `--add` (com auto-incremento de ID), `--search [id]`, `--delete [id]`, implementando arquivo de lock contra acessos simultâneos de escrita.
- **Comando-Chave:** Construção do CRUD completo em Bash com validação e lock concorrido.
- **Diálogo AURA-7:** *"O estoque está online. Implante as validações, implemente a rotina de exclusão mútua e crie a ferramenta!"*

---

### 🔵 SUBMÓDULO 1.10: Interfaces de Terminal (Dialog) & Web CGI (Níveis 91-100)
*Foco de Certificação: LPIC-1 Tópico 103.2 & 105.2*
**Narrativa:** O protagonista quer dar uma interface visual profissional (TUI) ao script de estoque e testar o acesso web.

#### Nível 91 — Cores no Terminal
- **Contexto:** Exibir alertas importantes coloridos no console do terminal.
- **Missão:** Imprimir mensagens com cores de aviso usando sequências ANSI.
- **Comando-Chave:** `echo -e "\e[32m[SUCESSO]\e[0m"`
- **Diálogo AURA-7:** *"Use a opção `-e` do echo para interpretar códigos de escape de cores ANSI."*

#### Nível 92 — Posicionamento de Cursor
- **Contexto:** Desenhar interfaces de console organizadas em posições fixas da tela.
- **Missão:** Mover o cursor para coordenadas específicas do terminal.
- **Comando-Chave:** `tput cup 10 20`
- **Diálogo AURA-7:** *"`tput` consulta o banco terminfo. Controle o cursor com facilidade."*

#### Nível 93 — Efeitos Sonoros
- **Contexto:** Alertar o operador sobre erros graves de sistema com avisos sonoros.
- **Missão:** Emitir o sinal acústico (beep) através do console.
- **Comando-Chave:** `echo -e "\a"`
- **Diálogo AURA-7:** *"O caractere de escape `\a` (alert) ativa a campainha acústica do terminal."*

#### Nível 94 — Apresentação do Dialog
- **Contexto:** Criar interfaces gráficas textuais (TUI) sem precisar programar em bibliotecas complexas de C/Python.
- **Missão:** Invocar caixas de texto com o utilitário do sistema.
- **Comando-Chave:** `dialog --infobox "Carregando..." 5 20`
- **Diálogo AURA-7:** *"`dialog` desenha janelas interativas na interface de texto de forma simples."*

#### Nível 95 — Mensagens e Decisões
- **Contexto:** Solicitar confirmação ao usuário sobre exclusões do estoque.
- **Missão:** Capturar retornos de decisões do usuário.
- **Comando-Chave:** `dialog --yesno "Deseja continuar?" 6 30`
- **Diálogo AURA-7:** *"O status de saída do dialog muda: `0` para Sim e `1` para Não."*

#### Nível 96 — Coleta de Dados
- **Contexto:** Receber novos cadastros de produtos de forma visual.
- **Missão:** Capturar inputs textuais de caixas do dialog.
- **Comando-Chave:** `dialog --inputbox "Nome:" 8 30 2> /tmp/input.txt`
- **Diálogo AURA-7:** *"Dialog envia inputs para stderr. Redirecione para um arquivo temporário."*

#### Nível 97 — Menus Interativos
- **Contexto:** Permitir ao operador escolher a ação (cadastrar, buscar, deletar) em uma lista.
- **Missão:** Criar caixas de menus com retornos atrelados a opções.
- **Comando-Chave:** `dialog --menu "Selecione:" 10 30 3 1 "Add" 2 "Search"`
- **Diálogo AURA-7:** *"Mapeie tags e descrições no menu. O retorno capturado será a tag escolhida."*

#### Nível 98 — Seleções Múltiplas
- **Contexto:** Configurar permissões de visualização do estoque em grupos de usuários.
- **Missão:** Criar caixas do tipo checklist com retornos acumulativos.
- **Comando-Chave:** `dialog --checklist "Selecione:" 10 40 3 opt1 "Desc" on`
- **Diálogo AURA-7:** *"`checklist` permite marcar múltiplos itens. As tags selecionadas saem em stdout."*

#### Nível 99 — Barras de Carregamento
- **Contexto:** Exibir o progresso do backup das planilhas de estoque.
- **Missão:** Desenhar caixas de carregamento dinâmico alimentadas por laço.
- **Comando-Chave:** `for i in $(seq 1 100); do echo $i; sleep 0.1; done | dialog --gauge "Progresso" 6 40`
- **Diálogo AURA-7:** *"`gauge` lê valores inteiros de 1 a 100 através de pipes em tempo real."*

#### Nível 100 — [Desafio Prático Integrado] Zuserd - A Coroação
- **Contexto:** O mercadinho precisa da aplicação rodando com visual profissional no terminal.
- **Missão:** Desenvolver o script `zuserd.sh` que utilize `dialog` para construir um painel visual contendo menu principal (Cadastrar, Buscar, Deletar, Sair), dialogs de inputs apropriados e confirmações integradas com a lógica de manipulação e arquivos de lock do script `estoque.sh` (do Submódulo 1.9).
- **Comando-Chave:** Integração completa do CRUD com menus, inputs, locks e tratamento de retornos de caixa.
- **Diálogo AURA-7:** *"O sistema de estoque está coroado. Una o motor de banco de dados à interface TUI e entregue o sistema do cliente!"*
