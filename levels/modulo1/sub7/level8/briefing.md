# Nível 68 — Sed Backup in-place (.bak)

## 🎮 Contexto do Freela
Ao editar arquivos críticos com `sed` em sistemas de produção, é imperativo gerar uma cópia de backup do arquivo original antes da alteração para permitir rollback rápido caso algo dê errado.

## 🛠️ Missão
Use o comando `sed` para substituir a entrada `127.0.0.1 localhost` por `127.0.0.1 loopback` no arquivo `/home/operator/hosts.txt`. O comando deve obrigatoriamente criar uma cópia de backup nomeada `/home/operator/hosts.txt.bak`.

## 📝 Comandos Úteis
*   `sed -i.bak 's/localhost/loopback/g' /home/operator/hosts.txt`: A extensão após a flag `-i` instrui o sed a gerar o backup automaticamente.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/hosts.txt` deve conter a alteração, e a cópia intocada `/home/operator/hosts.txt.bak` deve existir.
