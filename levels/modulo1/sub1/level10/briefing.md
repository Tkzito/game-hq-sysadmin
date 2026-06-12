# Nível 10 — O Primeiro Diagnóstico

## 🎮 Contexto do Freela
O vizinho no Bunker 7 está sem oxigênio porque as ventoinhas de ventilação travaram devido a um superaquecimento técnico. Como o único operador disponível no setor, você precisa agir rapidamente para salvar vidas! AURA-7 detectou uma rotina térmica de segurança escondida nos diretórios de configuração do bunker.

## 🛠️ Missão
1. Investigue o diretório oculto `.bunker_config` a partir da raiz (`/home/operator`).
2. Navegue pelos subdiretórios até encontrar o script `ligar_coolers.sh` (caminho: `.bunker_config/sistema/scripts/ligar_coolers.sh`).
3. Modifique as permissões do script usando `chmod` para torná-lo executável.
4. Execute o script `ligar_coolers.sh` para acionar as ventoinhas auxiliares e restabelecer o fluxo de oxigênio em 21%.

## 📝 Comandos Úteis
*   `ls -la`: Lista todos os arquivos, incluindo arquivos e diretórios ocultos (iniciados com `.`).
*   `cd`: Altera o diretório atual de trabalho.
*   `chmod +x arquivo.sh` ou `chmod 755 arquivo.sh`: Concede permissão de execução ao script.
*   `./arquivo.sh`: Executa um script presente no diretório atual.

## 🎯 Critério de Sucesso
*   Existência do script `.bunker_config/sistema/scripts/ligar_coolers.sh` com permissão de execução.
*   O script ter sido executado com sucesso no terminal virtual.
