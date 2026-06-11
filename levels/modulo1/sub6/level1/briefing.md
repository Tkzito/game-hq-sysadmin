# Nível 51 — O Começo de Tudo (^)

## 🎮 Contexto do Freela
Os logs do gerador central estão lotados de mensagens inúteis. Precisamos depurar o sistema extraindo apenas as mensagens de erro que ocorrem no início de cada linha do arquivo de log.

## 🛠️ Missão
Filtre o arquivo `/home/operator/logs.txt` exibindo na saída padrão apenas as linhas que começam exatamente com o termo `ERROR:`.

## 📝 Comandos Úteis
*   `grep "^ERROR:" arquivo`: O circunflexo `^` indica início de linha na expressão regular.

## 🎯 Critério de Sucesso
O jogador deve rodar um comando grep que filtre apenas as linhas iniciadas com `ERROR:` a partir do arquivo de logs fornecido.
