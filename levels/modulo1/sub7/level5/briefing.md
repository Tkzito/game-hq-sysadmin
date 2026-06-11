# Nível 65 — O Valor Padrão (${VAR:-default})

## 🎮 Contexto do Freela
Para evitar que scripts falhem por falta de parâmetros, boas práticas de Bash recomendam o uso de expansão de variáveis com valores padrão automáticos.

## 🛠️ Missão
Crie o script `/home/operator/saudacao_padrao.sh`. Ele deve ler a variável de ambiente `NOME_USUARIO`.
- Se a variável estiver definida e não-nula, o script deve imprimir `Ola, <NOME_USUARIO>`.
- Se a variável estiver vazia ou não definida, o script deve usar a palavra `Convidado` como padrão, imprimindo `Ola, Convidado`.

## 📝 Comandos Úteis
*   `${NOME_USUARIO:-Convidado}`: Retorna o valor de `NOME_USUARIO` ou `Convidado` se estiver ausente/vazia.

## 🎯 Critério de Sucesso
O script `/home/operator/saudacao_padrao.sh` deve usar a expansão de variável com valor padrão de forma correta.
