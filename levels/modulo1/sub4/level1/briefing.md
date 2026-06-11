# Nível 31 — Validação de Sintaxe Estática com 'bash -n'

## 🎮 Contexto do Freela
Um script crítico de reinicialização dos painéis solares (`/home/operator/reboot.sh`) foi editado de forma incorreta por um técnico remoto e agora está quebrado, impedindo a inicialização automática do painel. A execução falha imediatamente com erros de sintaxe confusos. Sua missão é diagnosticar onde a estrutura do código Bash falhou e consertá-lo.

## 🛠️ Missão
1. Analise o arquivo `/home/operator/reboot.sh` usando a verificação de sintaxe estática do bash (`bash -n`).
2. Identifique os erros de sintaxe estrutural (sugestão: atente para o bloco `if` e o laço `for`).
3. Corrija o script usando seu editor de preferência (`nano` ou `vim`) e garanta que o teste `bash -n reboot.sh` retorne sem nenhum erro.

## 📝 Comandos Úteis
*   `bash -n [script.sh]`: Avalia estaticamente a sintaxe de um script Bash sem executá-lo. É o método ideal para encontrar falta de delimitadores (ex: `done`, `fi`, `then`).
*   `nano` ou `vim`: Editores de terminal para corrigir o código.

## 🎯 Critério de Sucesso
O script `/home/operator/reboot.sh` deve rodar sem erros de sintaxe estrutural e se comportar da seguinte forma:
- Passar com sucesso na verificação `bash -n reboot.sh`.
- Executar e exibir "Forçando reboot..." com o argumento `force`.
- Executar e exibir "Reboot normal..." e a contagem regressiva de 3 a 1 nos demais casos.
