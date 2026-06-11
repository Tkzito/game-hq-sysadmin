# Nível 11 — O Script de Inicialização (A Shebang)

## 🎮 Contexto do Freela
Você está subindo de nível e agora vai criar seus próprios scripts automáticos para gerenciar AURA-7! Scripts necessitam de uma instrução especial na primeiríssima linha para que o sistema operacional saiba qual interpretador de comandos (shell) deve rodar o arquivo. Essa instrução é chamada de **Shebang** (`#!`). Sem ela, ou com a permissão errada, o script falhará ao rodar diretamente.

## 🛠️ Missão
1. Edite o script `/home/operator/diagnostico.sh`.
2. Insira a Shebang do Bash (`#!/bin/bash`) na primeiríssima linha do arquivo.
3. Adicione permissão de execução ao script para que ele possa ser executado diretamente com `./diagnostico.sh`.

## 📝 Comandos Úteis
*   `nano <arquivo>` ou `vim <arquivo>`: Editores de texto clássicos de terminal para modificar arquivos.
*   `chmod +x <script.sh>`: Concede permissão de execução a um script no Linux.
*   `./<script.sh>`: Executa um script presente no diretório atual.

## 🎯 Critério de Sucesso
*   A primeira linha de `diagnostico.sh` deve ser `#!/bin/bash`.
*   O arquivo deve ser executável (permissão `+x`).
