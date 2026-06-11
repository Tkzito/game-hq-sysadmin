# Nível 22 — Limpeza e Organização com 'mv'

## 🎮 Contexto do Freela
Você está organizando o diretório de trabalho de um servidor legado. O operador anterior deixou logs espalhados pelo diretório home (`/home/operator/`) e um arquivo de configuração desatualizado com um nome impróprio. Sua tarefa é arrumar essa bagunça para manter o diretório limpo.

## 🛠️ Missão
1. Crie um diretório chamado `/home/operator/logs/`.
2. Mova todos os arquivos de extensão `.log` (`auth_failure.log` e `database_query.log`) para o diretório `/home/operator/logs/`.
3. Renomeie o arquivo `/home/operator/config.old` para `/home/operator/config.cfg` (mantendo-o no diretório home `/home/operator/`).
4. Certifique-se de que o arquivo `/home/operator/instructions.txt` permaneça intocado.

## 📝 Comandos Úteis
*   `mkdir`: Cria um novo diretório.
*   `mv`: Move ou renomeia arquivos e diretórios.

## 🎯 Critério de Sucesso
Os logs devem estar dentro de `/home/operator/logs/`, o arquivo de configuração deve se chamar `config.cfg` e não devem sobrar arquivos `.log` ou `.old` soltos no diretório raiz do operador.
