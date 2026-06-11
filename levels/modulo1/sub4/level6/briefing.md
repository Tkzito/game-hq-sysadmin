# Nível 36 — Execução Segura com 'set -e' e 'set -u'

## 🎮 Contexto do Freela
Por padrão, o Bash é muito tolerante a erros. Se um comando falhar no meio do script, ele continuará executando as próximas linhas de forma cega. Pior ainda: se você tentar usar uma variável que não foi declarada (vazia), o Bash prosseguirá silenciosamente. Em scripts administrativos, isso pode ser catastrófico (ex: rodar `rm -rf $DIR_INDEFINIDO/*`). Usar as flags `set -e` e `set -u` obriga o script a abortar imediatamente diante de qualquer comando falho ou variável não inicializada.

## 🛠️ Missão
Modifique o arquivo `/home/operator/deploy.sh`:
1. Adicione a ativação de `set -e` e `set -u` (ou de forma agregada `set -eu` / `set -euo pipefail`) nas primeiras linhas do script (abaixo do shebang `#!/bin/bash`).
2. Mapeie o erro de variável indefinida e defina `SOURCE_DIR` com o caminho absoluto `/home/operator/source`.
3. Garanta que o script execute sem erros e faça a cópia de `app.txt` de `/home/operator/source/` para `/home/operator/dest/` retornando `exit 0` com a mensagem `Deploy concluído com sucesso!`.

## 📝 Comandos Úteis
*   `set -e`: Aborta a execução imediatamente se qualquer comando retornar um código de saída diferente de 0.
*   `set -u`: Aborta a execução se houver tentativa de expandir uma variável que não foi previamente definida.
*   `set -o pipefail`: Garante que em pipelines de comandos (`cmd1 | cmd2`), se algum deles falhar, todo o pipeline seja considerado falho.

## 🎯 Critério de Sucesso
O script `deploy.sh` deve ter `set -e` e `set -u` ativos, rodar com sucesso copiando o arquivo, e abortar (retornando não-zero) se a cópia falhar (como em caso de ausência do arquivo de origem).
