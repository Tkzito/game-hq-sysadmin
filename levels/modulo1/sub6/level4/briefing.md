# Nível 54 — Curingas e Repetições (.*)

## 🎮 Contexto do Freela
Em expressões regulares, o ponto `.` casa qualquer caractere, e o asterisco `*` indica zero ou mais repetições do caractere anterior. Juntos, `.*` agem como um curinga para qualquer texto intermediário.

## 🛠️ Missão
Encontre todas as linhas no arquivo `/home/operator/dispositivos.txt` que contêm a palavra `Dispositivo` e a palavra `Falha` na mesma linha, independentemente do que houver entre elas.

## 📝 Comandos Úteis
*   `Dispositivo.*Falha`: Expressão regular que busca a primeira palavra, seguida de qualquer quantidade de caracteres, até a segunda palavra.

## 🎯 Critério de Sucesso
Executar um filtro com grep usando a regex `Dispositivo.*Falha` no arquivo de dispositivos.
