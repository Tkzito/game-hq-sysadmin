# Nível 126 — Download de Arquivos via Linha de Comando

## 🎮 Contexto do Freela
O servidor da filial voltou a responder parcialmente. Você precisa baixar um script de diagnóstico remoto e consultar um endpoint de saúde de um microsserviço interno da distribuidora na porta 8080. Tudo via linha de comando.

## 🛠️ Missão
1. Baixe o script de diagnóstico localizado em `http://localhost:8080/diagnostico.sh` usando o comando `wget` e salve-o em `/home/operator/diagnostico.sh`.
2. Faça uma requisição para o endpoint de API `http://localhost:8080/health` usando o comando `curl` e salve a saída de resposta (o JSON) no arquivo `/home/operator/health.json`.

## 🎯 Comando-Chave
`wget http://localhost:8080/diagnostico.sh`, `curl http://localhost:8080/health -o /home/operator/health.json`

## 🎯 Critério de Sucesso
* Baixar `/home/operator/diagnostico.sh` via `wget`.
* Fazer a requisição via `curl` e salvar a resposta com sucesso em `/home/operator/health.json`.
