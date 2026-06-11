# Nível 63 — Substituição In-place com Sed

## 🎮 Contexto do Freela
Sua missão é alterar a porta padrão do servidor de banco de dados diretamente no arquivo `/home/operator/db.conf`. Fazer isso abrindo um editor interativo consome muito tempo e não pode ser automatizado.

## 🛠️ Missão
Use o comando `sed` com a opção de alteração in-place (`-i`) para substituir o valor da porta de `PORT=3306` para `PORT=3307` dentro do arquivo `/home/operator/db.conf`.

## 📝 Comandos Úteis
*   `sed -i 's/PORT=3306/PORT=3307/g' arquivo`

## 🎯 Critério de Sucesso
O arquivo `/home/operator/db.conf` deve ter a porta alterada de 3306 para 3307.
