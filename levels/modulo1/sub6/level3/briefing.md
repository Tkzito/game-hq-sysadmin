# Nível 53 — Classes de Caracteres ([])

## 🎮 Contexto do Freela
Existem sensores instalados nos setores de A a F da nave. O console de diagnóstico reportou avaria em alguns deles, mas os dados estão misturados com setores inválidos ou registros numéricos.

## 🛠️ Missão
Extraia do arquivo `/home/operator/sensores.txt` apenas as linhas que contêm o termo `Setor ` seguido por uma letra de `A` a `F` (maiúsculas) e depois um número de `1` a `5`.
Exemplo de padrão válido: `Setor A3`, `Setor F5`.

## 📝 Comandos Úteis
*   `[A-F]`: Casará qualquer letra de A a F.
*   `[1-5]`: Casará qualquer número de 1 a 5.

## 🎯 Critério de Sucesso
Filtrar corretamente apenas os setores dentro do range utilizando classes de caracteres no grep.
