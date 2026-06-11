# Nível 14 — Aspas Simples vs. Aspas Duplas

## 🎮 Contexto do Freela
Você está depurando um script criado por um estagiário que saiu do laboratório. O script `/home/operator/mensagem.sh` deveria reportar o status de AURA-7, mas exibe literalmente a frase `AURA STATUS: $STATUS` em vez do valor da variável (`ESTÁVEL`). No Bash, aspas simples (`'`) tratam todo caractere de forma literal (desabilitando a expansão de variáveis), enquanto aspas duplas (`"`) permitem a substituição e interpolação de variáveis e comandos.

## 🛠️ Missão
1. Edite o script `/home/operator/mensagem.sh`.
2. Altere a linha `echo 'AURA STATUS: $STATUS'` substituindo as aspas simples por aspas duplas, de modo que a variável `$STATUS` seja exibida com seu valor real.

## 📝 Comandos Úteis
*   Aspas Simples: `'texto $VARIAVEL'` -> Exibe literalmente `texto $VARIAVEL`.
*   Aspas Duplas: `"texto $VARIAVEL"` -> Exibe `texto valor_da_variavel`.

## 🎯 Critério de Sucesso
O script executado `./mensagem.sh` deve imprimir:
`AURA STATUS: ESTÁVEL`
