# Nível 30 — Operação Busca, Limpeza e Arquivamento

## 🎮 Contexto do Freela
Você detectou que um invasor deixou rastros pelo sistema e criou vários arquivos com a extensão `.bak` sob `/home/operator/sistema/` contendo dumps de memória e dados roubados. A sua missão como analista de segurança é:
1. Buscar todos esses arquivos residuais (`*.bak`).
2. Agrupá-los e compactá-los em um arquivo seguro chamado `/home/operator/backup_hacker.tar.gz` para análise posterior.
3. Excluir os arquivos originais `.bak` do sistema para liberar espaço e estancar o vazamento.

## 🛠️ Missão
1. Localize de forma recursiva todos os arquivos com a extensão `.bak` dentro do diretório `/home/operator/sistema/`.
2. Compacte os arquivos encontrados em `/home/operator/backup_hacker.tar.gz`. (Dica: garanta que a busca jogue os caminhos para o comando `tar` ou que você compacte os caminhos relativos).
   *   Exemplo de comando combinando busca e empacotamento:
       `find sistema/ -name "*.bak" | xargs tar -czf backup_hacker.tar.gz` (execute a partir do diretório `/home/operator/` para manter os caminhos relativos coerentes).
3. Exclua os arquivos `.bak` originais que estavam no diretório `/home/operator/sistema/`. Os arquivos legítimos (como `.conf` ou `.log`) **não** devem ser excluídos.

## 📝 Comandos Úteis
*   `find`: Busca arquivos com critérios específicos.
*   `xargs`: Constrói e executa linhas de comando a partir da entrada padrão (excelente para passar a lista de arquivos encontrada pelo `find` para o `tar`).
*   `tar -czf ...`: Compacta os arquivos.
*   `rm`: Remove os arquivos originais. (Pode ser feito via `-delete` do `find` ou `xargs rm` após o arquivamento seguro).

## 🎯 Critério de Sucesso
O arquivo `/home/operator/backup_hacker.tar.gz` deve existir contendo os arquivos `.bak` originais, e estes arquivos originais devem ter sido excluídos do disco, enquanto os arquivos legítimos permanecem intocados.
