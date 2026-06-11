# Nível 28 — Filtrando por Tamanho de Arquivo com 'find'

## 🎮 Contexto do Freela
O sistema de arquivos do servidor acusou limite crítico de armazenamento. A maior parte do desperdício de espaço é devido a arquivos de despejo de sistema (`system dumps`) gigantescos de depuração antiga perdidos na pasta `/home/operator/logs/`. Você precisa descobrir qual arquivo tem tamanho superior a 10 Megabytes (`10M`) para reportá-lo para exclusão.

## 🛠️ Missão
1. Use o comando `find` com filtros de tamanho para encontrar qual arquivo sob o diretório `/home/operator/logs/` possui tamanho maior do que 10 Megabytes.
2. Salve o caminho do arquivo encontrado (ex: `/home/operator/logs/nome_do_arquivo.log`) dentro do arquivo `/home/operator/giant_log.txt`.

## 📝 Comandos Úteis
*   `find`: Pode filtrar por tamanho de arquivo usando a opção `-size`.
    *   Exemplo de uso: `find /caminho -size +10M` (o sinal `+` indica 'maior que', e `M` especifica Megabytes).
    *   Outros sufixos úteis: `k` (Kilobytes), `G` (Gigabytes).

## 🎯 Critério de Sucesso
O arquivo `/home/operator/giant_log.txt` deve conter o caminho correto ou nome do arquivo de log gigante localizado sob a pasta `/home/operator/logs/`.
