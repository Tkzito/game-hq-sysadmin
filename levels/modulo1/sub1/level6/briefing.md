# Nível 6 — Consultando o Manual

## 🎮 Contexto do Freela
Você está prestes a carregar uma chave de autenticação de rede de AURA-7, mas precisa validar o tamanho exato em bytes do buffer `/home/operator/dados_rede.txt` antes de transmiti-lo. Caso contrário, a transmissão sofrerá overflow. Você sabe que a ferramenta `wc` serve para contar coisas em arquivos, mas não se lembra qual é o parâmetro correto para contar apenas os bytes.

## 🛠️ Missão
1. Consulte a ajuda ou manual do utilitário `wc` usando o argumento `--help`.
2. Descubra a opção que conta apenas os bytes/caracteres.
3. Execute a ferramenta `wc` com essa opção no arquivo `/home/operator/dados_rede.txt`.
4. Salve apenas o número resultante (23) em um arquivo chamado `bytes.txt` no seu diretório home (`/home/operator`).

## 📝 Comandos Úteis
*   `<comando> --help`: Exibe a documentação rápida da maioria das ferramentas GNU/Linux.
*   `wc <arquivo>`: Por padrão, conta linhas, palavras e bytes de um arquivo.
*   `wc -c <arquivo>`: Conta os bytes/caracteres do arquivo.

## 🎯 Critério de Sucesso
O arquivo `bytes.txt` deve ser criado contendo o número `23`.
