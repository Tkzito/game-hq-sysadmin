# Nível 168 — Mitigação de Ataques DDoS

## 🎮 Contexto do Freela
O gateway público de comunicação das usinas está sob ataque de negação de serviço distribuído (DDoS), saturando a tabela de conexões.

## 🎯 Comando-Chave
``tail -n 1000 traffic.log | awk '{print $1}' | sort | uniq -c`, `ufw deny from [IP_ATACANTE] to any``

## 🎯 Critério de Sucesso
* Executar as tarefas descritas na missão com sucesso.
