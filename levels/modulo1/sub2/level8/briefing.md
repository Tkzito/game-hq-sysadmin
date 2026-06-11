# Nível 18 — O Modo de Segurança (Strict Mode)

## 🎮 Contexto do Freela
Por padrão, scripts Bash são tolerantes a erros: se um comando falha, ele segue para o próximo; se você usa uma variável que nunca foi declarada, ele a assume como vazia silenciosamente (o que pode resultar em `rm -rf /$VARIAVEL` apagando todo o sistema se `$VARIAVEL` estiver vazia!).
Para evitar desastres, desenvolvedores Bash profissionais utilizam o **Strict Mode** adicionando o comando `set -euo pipefail`.
*   `set -e`: Aborta a execução do script imediatamente se qualquer comando falhar.
*   `set -u`: Aborta o script se tentar referenciar uma variável não declarada.
*   `set -o pipefail`: Garante que pipelines (`cmd1 | cmd2`) retornem erro se *qualquer* comando do pipe falhar (por padrão, apenas o último comando dita o código de retorno do pipe).

## 🛠️ Missão
1. Edite o script `/home/operator/sync.sh`.
2. Adicione as diretivas do modo estrito (`set -euo pipefail`) na linha logo abaixo da shebang.
3. Se você rodar o script agora, o modo de segurança vai abortar a execução imediatamente devido à variável indefinida `$PASTA_DESTINO`. Conserte isso declarando a variável `PASTA_DESTINO="/home/operator/destino"` logo acima do bloco de ações.

## 📝 Comandos Úteis
*   Para configurar o modo de segurança clássico:
    ```bash
    set -euo pipefail
    ```

## 🎯 Critério de Sucesso
O script `./sync.sh` deve rodar com sucesso, gerar o arquivo `/home/operator/destino/sync.txt` e conter a ativação correta do Strict Mode.
