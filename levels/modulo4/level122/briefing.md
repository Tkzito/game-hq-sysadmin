# Nível 122 — Roteamento e Tabela de Rotas: Como os Pacotes Viajam

## 🎮 Contexto do Freela
Seu servidor consegue se comunicar dentro da rede local, mas como ele sabe para onde enviar pacotes destinados à internet ou à filial de Caruaru? A tabela de rotas é o mapa que o kernel usa para tomar essa decisão.

## 🛠️ Missão
Visualize a tabela de rotas do sistema usando o comando `ip route` no terminal.
Identifique o endereço IP do **gateway padrão** (o roteador padrão da rede, listado na rota `default`).
O sistema validará se você executou a inspeção das rotas.

## 🎯 Comando-Chave
`ip route show`, `ip route get 8.8.8.8`

## 🎯 Critério de Sucesso
* Executar o comando `ip route` (ou similar) no terminal para inspecionar a tabela de rotas do sistema.
