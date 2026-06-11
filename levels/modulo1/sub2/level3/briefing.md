# Nível 13 — Criando e Usando Variáveis

## 🎮 Contexto do Freela
Variáveis são blocos fundamentais para qualquer script útil. Elas armazenam dados voláteis (como caminhos, contagens, strings de status) para serem reaproveitados em todo o script. Em Bash, declaramos variáveis no formato `NOME_VARIAVEL="valor"` (sem espaços ao redor do sinal `=`) e as chamamos no código prefixando com `$` (ex: `$NOME_VARIAVEL`).

## 🛠️ Missão
1. Edite o script `/home/operator/info.sh`.
2. Declare a variável `NOME_IA` com o valor literal `"AURA-7"`.
3. Declare a variável `INTEGRIDADE` com o valor numérico `95`.
4. Não modifique a linha de impressão final (`echo ...`). Ela deve usar as variáveis que você declarou para imprimir a mensagem de status da IA.

## 📝 Comandos Úteis
*   Sintaxe correta de declaração (sem espaços):
    ```bash
    MINHA_VARIAVEL="conteudo"
    ```
*   Sintaxe incorreta (vai dar erro de comando não encontrado):
    ```bash
    MINHA_VARIAVEL = "conteudo"
    ```

## 🎯 Critério de Sucesso
Ao rodar `./info.sh`, a saída final no console deve ser exatamente:
`IA: AURA-7 - Integridade: 95%`
