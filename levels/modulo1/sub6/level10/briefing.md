# Nível 60 — A Chave Mestra (Hexadecimal)

## 🎮 Contexto do Freela
O acesso ao terminal de segurança da IA exige uma chave de autenticação hexadecimal (composta apenas por números de 0 a 9 e letras minúsculas/maiúsculas de A a F) de exatamente 32 caracteres.

## 🛠️ Missão
Filtre o arquivo `/home/operator/tokens.txt` exibindo apenas as chaves hexadecimais válidas de 32 caracteres (linhas contendo exatamente a chave, do início ao fim, sem outros textos ao redor).

## 📝 Comandos Úteis
*   `^[0-9a-fA-F]{32}$`: A regex cobre início `^`, fim `$` e a quantidade exata `{32}` da classe hexadecimal.

## 🎯 Critério de Sucesso
Utilizar `grep -E` com âncoras de início/fim de linha e quantificadores para filtrar chaves hexadecimais de 32 dígitos sem ruídos.
