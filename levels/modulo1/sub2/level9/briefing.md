# Nível 19 — Input Interativo (Comando Read)

## 🎮 Contexto do Freela
Até agora seus scripts rodaram de forma passiva, mas AURA-7 precisa interagir com o operador humano para procedimentos críticos que requerem confirmação explicitação. O comando `read` suspende a execução do script e aguarda uma entrada de texto do teclado. Ele pode ser acoplado com a flag `-p` para exibir uma mensagem de prompt descritiva.

## 🛠️ Missão
1. Edite o script `/home/operator/confirmacao.sh`.
2. Adicione o comando `read` para salvar a resposta do jogador na variável `RESPOSTA`.
3. O prompt exibido para o usuário deve ser exatamente `"Deseja inicializar a AURA-7? [S/N] "`.

## 📝 Comandos Úteis
*   Sintaxe básica do `read` com prompt e salvamento em variável:
    ```bash
    read -p "Sua pergunta aqui: " NOME_DA_VARIAVEL
    ```

## 🎯 Critério de Sucesso
*   Presença da instrução `read` no script `/home/operator/confirmacao.sh`.
*   O script deve imprimir `Inicializando AURA...` se receber `s` ou `S`, e `Operacao abortada` se receber qualquer outra entrada.
