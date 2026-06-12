# Nível 170 — [Desafio Final: O Dia do Caos]

## 🎮 Contexto do Freela
Um ataque coordenado de ciber-sabotadores derrubou a subestação solar de Ibiúna (eco-node-2) e paralelamente iniciou um DDoS no gateway de monitoramento de vento, enquanto um memory leak de container está estourando a RAM do cluster.

## 🛠️ Missão
Diagnosticar e restabelecer o equilíbrio do ecossistema em menos de 10 minutos. O jogador deve:
  1. Imediatamente identificar e banir o IP do DDoS via regras de firewall (UFW).
  2. Isolar o nó caído e redistribuir a carga de telemetria aplicando o novo manifesto de replicação em alta disponibilidade.
  3. Resolver o travamento do container doente reiniciando o serviço via orquestrador e aplicando regras de liveness e limites de memória RAM no manifesto YAML.

## 🎯 Comando-Chave
`Diagnóstico unificado, regras de UFW, escalonamento e reconciliação declarativa com limites de CPU/RAM em ambiente sob estresse.`

## 🎯 Critério de Sucesso
* Executar as tarefas descritas na missão com sucesso.
