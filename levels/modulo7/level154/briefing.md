# Nível 154 — Mapeamento de Portas de Comunicação

## 🎮 Contexto do Freela
O container Node.js roda internamente na porta `3000`, mas os clientes precisam acessá-lo externamente pela porta pública `80`.

## 🎯 Comando-Chave
``docker run -d -p 80:3000 --name node-web app:v1``

## 🎯 Critério de Sucesso
* Executar as tarefas descritas na missão com sucesso.
