# Nível 15 — Variáveis de Ambiente (Globais)

## 🎮 Contexto do Freela
Sistemas operacionais Linux vêm pré-configurados com dezenas de **variáveis de ambiente** globais que armazenam metadados sobre o sistema e a sessão de terminal ativa (ex: quem é o usuário conectado, onde fica sua pasta pessoal, qual o caminho de busca por binários). AURA-7 precisa coletar esses dados para calibrar o perfil de acesso local.

## 🛠️ Missão
1. Edite o script `/home/operator/ambiente.sh`.
2. Substitua os termos `PLACEHOLDER_USER` e `PLACEHOLDER_HOME` pelas variáveis de ambiente globais correspondentes:
   *   `$USER`: Guarda o nome do usuário logado (deve retornar `operator`).
   *   `$HOME`: Guarda o caminho absoluto do diretório home do usuário (deve retornar `/home/operator`).

## 📝 Comandos Úteis
*   Para listar todas as variáveis de ambiente atuais, você pode usar o comando `env` ou `printenv`.
*   Para referenciar uma variável de ambiente global em um script, use o sinal `$`: `echo "$USER"` ou `echo "Meu home é $HOME"`.

## 🎯 Critério de Sucesso
O script `./ambiente.sh` deve exibir:
`Usuario: operator - Home: /home/operator`
