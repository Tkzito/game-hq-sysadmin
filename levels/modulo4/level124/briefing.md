# Nível 124 — Rastreamento de Pacotes: Seguindo a Trilha

## 🎮 Contexto do Freela
Sabemos que o ping falha. Agora precisamos descobrir exatamente onde na rota o pacote para. O `traceroute` mostra cada salto da jornada do pacote — como câmeras de segurança na estrada entre você e a filial.

## 🛠️ Missão
Execute um rastreamento de rota até o IP da filial usando o comando `traceroute 192.168.2.100` ou `tracepath 192.168.2.100` no terminal.
Identifique o endereço IP do **último salto (hop)** que respondeu antes de começar a falhar (linhas com `* * *` ou `no reply`).
O sistema validará se você executou o rastreamento no terminal.

## 🎯 Comando-Chave
`traceroute 192.168.2.100`, `tracepath 192.168.2.100`

## 🎯 Critério de Sucesso
* Executar o comando `traceroute` ou `tracepath` apontando para o IP da filial no terminal.
