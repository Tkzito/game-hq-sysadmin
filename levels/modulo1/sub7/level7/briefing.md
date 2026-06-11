# Nível 67 — Carregando Modulos de Funções (source)

## 🎮 Contexto do Freela
Para manter os scripts limpos, costumamos isolar funções comuns em arquivos de biblioteca e carregá-los usando o comando `source`.

## 🛠️ Missão
Escreva um script `/home/operator/principal.sh` que carregue a biblioteca `/home/operator/lib.sh` usando `source` (ou `.`) e em seguida chame a função `mensagem_sucesso` lá definida.

## 📝 Comandos Úteis
*   No arquivo `lib.sh` já existe uma função declarada. Você só precisa carregar esse arquivo no script `principal.sh` e invocar a função `mensagem_sucesso`.

## 🎯 Critério de Sucesso
O script `principal.sh` deve chamar com sucesso a função declarada na biblioteca externa.
