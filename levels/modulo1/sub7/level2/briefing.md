# Nível 62 — Parsing Chave-Valor (sem comentários)

## 🎮 Contexto do Freela
Arquivos de configuração em formato `CHAVE=VALOR` frequentemente contêm linhas em branco ou comentários iniciados com `#`. Seu script deve ler esses arquivos ignorando o ruído.

## 🛠️ Missão
Escreva um script `/home/operator/parser.sh` que processa o arquivo `/home/operator/config.env`.
- Ele deve ignorar linhas vazias e linhas que comecem com `#`.
- Para cada linha válida, ele deve imprimir: `Chave: <chave> | Valor: <valor>`.
(Exemplo: se a linha for `PORT=8080`, deve imprimir `Chave: PORT | Valor: 8080`).

## 📝 Comandos Úteis
*   `[[ "$line" =~ ^# ]]` ou `[[ -z "$line" ]]` para ignorar comentários e vazios.
*   `IFS='=' read -r key val <<< "$line"` para quebrar a linha usando o caractere `=`.

## 🎯 Critério de Sucesso
O script `/home/operator/parser.sh` deve extrair as chaves e valores ignorando linhas em branco e comentários.
