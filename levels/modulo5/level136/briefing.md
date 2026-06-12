# Nível 136 — Arrays em Bash: Listas com Superpoderes

## 🎮 Contexto do Freela
Para gerenciar vários servidores e suas respectivas portas de forma limpa, strings simples não são suficientes. Precisamos usar arrays indexados (para a lista de serviços) e arrays associativos (como dicionários, para mapear os nomes às suas portas correspondentes).

## 🛠️ Missão
Escreva o script `/home/operator/array_monitor.sh` que deve:
1. Usar um array associativo (use `declare -A`) chamado `SERVICE_PORTS` para mapear os serviços e suas portas:
   * `app01` na porta `8080`
   * `db01` na porta `5432`
2. Iterar sobre as chaves do array associativo.
3. Imprimir a relação entre o serviço e sua porta. Por exemplo: "Serviço app01 está na porta 8080" e "Serviço db01 está na porta 5432".
4. Tornar o script executável (`chmod +x`).

## 💡 Dicas e Exemplo de Estrutura
```bash
#!/bin/bash
set -euo pipefail

# Declarar array associativo
declare -A SERVICE_PORTS
SERVICE_PORTS["app01"]=8080
SERVICE_PORTS["db01"]=5432

# Iterar sobre as chaves do array
for service in "${!SERVICE_PORTS[@]}"; do
    echo "Serviço $service está na porta ${SERVICE_PORTS[$service]}"
done
```

## 🎯 Critério de Sucesso
* O script `/home/operator/array_monitor.sh` deve existir e ser executável.
* Deve usar explicitamente `declare -A` para criar o array associativo.
* A saída padrão do script deve conter as portas `8080` e `5432` impressas corretamente.
