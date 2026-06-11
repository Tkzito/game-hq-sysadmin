# Nível 8 — Faxina no Disco

## 🎮 Contexto do Freela
O subsistema de armazenamento de AURA-7 está disparando alertas críticos: espaço em disco insuficiente! Diversos dados de depuração temporários (`.tmp`) e antigas pastas de cache obsoletas continuam ocupando blocos físicos no drive de estado sólido do laboratório. Você deve realizar uma limpeza manual para evitar um travamento completo da IA.

## 🛠️ Missão
1. Remova o arquivo `/home/operator/cache.tmp`.
2. Delete a pasta obsoleta `/home/operator/cache_velho/` junto com todos os seus subarquivos internos de uma vez só.

## 📝 Comandos Úteis
*   `rm <arquivo>`: Remove/deleta um arquivo.
*   `rmdir <diretorio>`: Remove um diretório *somente se estiver vazio*.
*   `rm -r <diretorio>`: Remove recursivamente um diretório e todo o seu conteúdo interno (perigoso, use com atenção!).
*   `rm -f`: Ignora arquivos inexistentes e nunca pergunta antes de remover.

## 🎯 Critério de Sucesso
*   Inexistência de `/home/operator/cache.tmp`.
*   Inexistência do diretório `/home/operator/cache_velho` e dos arquivos nele contidos.
