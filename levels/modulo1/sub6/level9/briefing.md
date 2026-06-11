# Nível 59 — Captura de Datas (YYYY-MM-DD)

## 🎮 Contexto do Freela
Você está inspecionando relatórios de transações astronômicas da nave e precisa extrair linhas correspondentes a eventos do ano de 2026 formatados estritamente como `YYYY-MM-DD`.

## 🛠️ Missão
Exiba todas as linhas do arquivo `/home/operator/transacoes.log` que contêm uma data no formato ISO `2026-MM-DD`.
(Dica: MM e DD são números de dois dígitos, por exemplo, `2026-05-14`).

## 📝 Comandos Úteis
*   `grep -E "2026-[0-9]{2}-[0-9]{2}"`

## 🎯 Critério de Sucesso
Filtrar linhas com datas válidas de 2026 usando regex estendida e quantificadores.
