# Nível 48 — Espaços no Caminho: $@ vs $*

## 🎮 Contexto do Freela
Você descobriu que o script de sincronização de pastas quebra quando os nomes das pastas contêm espaços em branco (ex: "Meus Documentos"). Isso ocorre porque o desenvolvedor original usou `$*` sem aspas no loop.

## 🛠️ Missão
Corrija ou crie o script `/home/operator/backup_pastas.sh`.
O script deve receber uma lista de caminhos de diretórios como argumentos. Ele deve iterar sobre eles de forma segura e, para cada argumento recebido, imprimir exatamente `Processando pasta: <nome_da_pasta>`.
Garanta que se um argumento contiver espaços (ex: `"Backup Final"`), ele seja impresso como uma única pasta e não dividido!

## 📝 Comandos Úteis
*   Sempre use `"$@"` (entre aspas duplas) para manter argumentos que contêm espaços intactos.

## 🎯 Critério de Sucesso
O script `/home/operator/backup_pastas.sh` deve rodar perfeitamente ao receber argumentos com espaços, processando cada um de forma isolada.
