# Nível 128 — Cópia Segura de Arquivos: Movendo Dados Remotamente

## 🎮 Contexto do Freela
Dentro do servidor da filial, você identificou um arquivo de log com erros críticos que precisa ser analisado localmente. Também precisa enviar um script de correção para o servidor remoto. O atalho de conexão `filial` já está configurado no seu terminal.

## 🛠️ Missão
Realize a transferência segura de arquivos entre o servidor local e a filial remota:
1. Copie o arquivo de log remoto `/var/log/sync.log` da `filial` para o seu diretório local `/home/operator/sync.log` usando `scp`.
2. Transfira o diretório local de scripts `/home/operator/backup_scripts/` para a pasta `/tmp/backup_scripts/` na `filial` usando `scp -r` ou `rsync`.

## 🎯 Comando-Chave
`scp filial:/var/log/sync.log /home/operator/sync.log`, `scp -r /home/operator/backup_scripts/ filial:/tmp/backup_scripts/`

## 🎯 Critério de Sucesso
* O arquivo `/home/operator/sync.log` deve ser copiado localmente com sucesso.
* O diretório `/tmp/backup_scripts/` deve ser transferido para a filial com sucesso.
