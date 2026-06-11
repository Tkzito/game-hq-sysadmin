# Nível 40 — Auditoria Completa e Robustez de Scripts

## 🎮 Contexto do Freela
Você atingiu o nível máximo deste submódulo de depuração. O script legado `/home/operator/backup_solar.sh` é uma bomba-relógio de falhas: ele possui erros crassos de sintaxe estrutural (no `if`), falta de tratamento de espaços em variáveis (gerando bugs de Word Splitting), nenhuma proteção contra falhas ou variáveis indefinidas (`set -eu`), e deixa arquivos de lixo temporário jogados em `/home/operator/tmp_backup` toda vez que tenta rodar. Sua missão é fazer um refactoring completo, tornando este script robusto e profissional para rodar em produção.

## 🛠️ Missão
Edite o arquivo `/home/operator/backup_solar.sh` e corrija os seguintes problemas:
1. **Depuração Estrita**: Adicione `set -eu` (ou `set -euo pipefail`) no topo do script.
2. **Auto-limpeza**: Adicione uma instrução `trap` para capturar os sinais `EXIT`, `INT` e `TERM` e executar uma rotina (função ou comando direto) que remova a pasta temporária `$TEMP_DIR` (`/home/operator/tmp_backup`).
3. **Erro de Sintaxe**: Conserte a instrução condicional `if` para que ela seja válida sintaticamente no fechamento e na cláusula de continuação (`then`).
4. **Proteção contra Espaços (Word Splitting)**: Envolva a variável `$DIR_LOGS` com aspas duplas (`"$DIR_LOGS"`) no comando de cópia (`cp`), pois o diretório correspondente (`logs solares`) contém espaços em seu nome.
5. Execute o script corrigido e valide se o backup final foi gerado e as pastas temporárias foram removidas do disco.

## 📝 Comandos Úteis
*   Use as ferramentas aprendidas nos níveis anteriores: `bash -n` para testar sintaxe estática antes de rodar, `bash -x` para rastrear as variáveis durante o teste, `trap` para gerenciar o encerramento do script, e o uso rigoroso de aspas duplas em torno de variáveis com caminhos de arquivos.

## 🎯 Critério de Sucesso
O script `/home/operator/backup_solar.sh` deve rodar limpo (exit code 0), gerar o backup compactado em `/home/operator/backup_solar/backup.tar.gz` contendo os logs, e remover a pasta temporária `/home/operator/tmp_backup` de forma automática via `trap`.
