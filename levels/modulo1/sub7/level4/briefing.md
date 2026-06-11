# Nível 64 — Exportando para o Escopo

## 🎮 Contexto do Freela
Variáveis definidas num script filho não sobem para o processo pai (seu shell atual) a menos que você utilize `export` e carregue o script usando o comando `source`.

## 🛠️ Missão
Crie um script `/home/operator/carregar_env.sh` contendo:
`export COMPARTIMENTO="NUCLEO_PRINCIPAL"`
`export STATUS_NUCLEO="ESTAVEL"`

## 📝 Comandos Úteis
*   Para que essas variáveis reflitam no seu shell interativo de validação, você precisará carregar o script com `source /home/operator/carregar_env.sh` antes da validação.

## 🎯 Critério de Sucesso
As variáveis `COMPARTIMENTO` e `STATUS_NUCLEO` devem estar exportadas e acessíveis no ambiente global.
