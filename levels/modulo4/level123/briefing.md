# Nível 123 — Diagnóstico de Conectividade: A Prova de Vida da Rede

## 🎮 Contexto do Freela
Hora de testar se conseguimos alcançar o servidor da filial de Caruaru. O `ping` é o primeiro teste — simples, mas extremamente informativo quando analisado corretamente.

## 🛠️ Missão
Envie pacotes ICMP para o servidor da filial usando o comando `ping 192.168.2.100` no terminal.
Identifique a mensagem de erro exata retornada pela rede (o padrão de falha).
O sistema validará se você executou a ferramenta `ping` contra o IP de destino.

## 🎯 Comando-Chave
`ping -c 4 192.168.2.100`

## 🎯 Critério de Sucesso
* Executar o comando `ping` apontando para o IP da filial no terminal.
