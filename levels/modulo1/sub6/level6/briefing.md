# Nível 56 — Quantificadores de Precisão

## 🎮 Contexto do Freela
Precisamos extrair códigos de sensores específicos. O padrão de identificação desses sensores consiste em exatamente 3 letras maiúsculas seguidas por um hífen e exatamente 4 números. Exemplo: `SEN-1024`, `TMP-9981`.

## 🛠️ Missão
Filtre o arquivo `/home/operator/inventario.txt` exibindo apenas as linhas que contêm essa chave padrão (exatamente 3 letras maiúsculas, um hífen e exatamente 4 números).

## 📝 Comandos Úteis
*   `grep -E "[A-Z]{3}-[0-9]{4}" arquivo`: O quantificador `{N}` especifica a repetição exata de vezes.

## 🎯 Critério de Sucesso
Utilizar quantificadores `{3}` e `{4}` com regex estendida para identificar e filtrar a chave padrão no arquivo de inventário.
