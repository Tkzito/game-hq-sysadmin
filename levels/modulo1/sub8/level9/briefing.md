# Nível 79 — Encadeamento Avançado de Pipes (Pipeline Completo)

## 🎮 Contexto do Freela
Nossa aplicação principal está instável. O arquivo `/home/operator/app.log` contém centenas de linhas de logs contendo mensagens do tipo `[INFO]`, `[WARNING]` e `[ERROR]`. Precisamos descobrir rapidamente quais são os 3 erros (`[ERROR]`) mais frequentes e quantas vezes cada um deles ocorreu, para que a equipe de engenharia possa atuar no bug prioritário.

## 🛠️ Missão
Construa uma cadeia de comandos (pipeline) para:
1.  Filtrar apenas as linhas de erro contendo `[ERROR]` no arquivo `/home/operator/app.log`.
2.  Ordenar essas linhas para que erros idênticos fiquem juntos.
3.  Contar a ocorrência de cada erro usando `uniq -c`.
4.  Ordenar o resultado de forma numérica decrescente (`sort -nr`), trazendo os erros mais frequentes para o topo.
5.  Limitar a saída para mostrar apenas as 3 primeiras linhas (`head -n 3`).
6.  Salvar o resultado final no arquivo `/home/operator/top_erros.txt`.

## 📝 Comandos Úteis
*   `grep '[ERROR]'`: Filtra linhas de erro.
*   `sort`: Ordena linhas alfabeticamente.
*   `uniq -c`: Conta linhas duplicadas consecutivas e exibe a contagem antes da linha.
*   `sort -nr`: Ordena numericamente (`-n`) de forma reversa/decrescente (`-r`).
*   `head -n 3`: Exibe as 3 primeiras linhas.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/top_erros.txt` deve conter exatamente os 3 erros mais frequentes com suas respectivas contagens (10 ocorrências de `Database down`, 8 de `Timeout` e 5 de `Connection failed`, nesta ordem). A validação inspecionará o histórico para confirmar a cadeia completa de pipes.
