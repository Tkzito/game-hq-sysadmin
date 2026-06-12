# Nível 125 — Resolução de Nomes e DNS: Traduzindo Endereços

## 🎮 Contexto do Freela
O sistema de rastreamento da distribuidora usa hostnames (como `filial-caruaru.saoluis.local`) em vez de IPs fixos. Se o DNS falhar, mesmo que a rede esteja funcionando, os serviços não se encontram.

## 🛠️ Missão
Use comandos como `dig` e `nslookup` para tentar resolver o nome `filial-caruaru.saoluis.local`.
Como o servidor DNS da rede não tem esse registro no momento (resolução falha), configure uma solução temporária local.
Adicione uma entrada estática no arquivo de hosts do sistema (`/etc/hosts`) mapeando o nome `filial-caruaru.saoluis.local` para o IP `192.168.2.100` (exige privilégios de `sudo`).

## 🎯 Comando-Chave
`dig filial-caruaru.saoluis.local`, `sudo nano /etc/hosts`, `cat /etc/hosts`

## 🎯 Critério de Sucesso
* Adicionar a linha `192.168.2.100 filial-caruaru.saoluis.local` no arquivo `/etc/hosts` do sistema.
