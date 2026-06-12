# Nível 133 — Loops Condicionais: Esperando que Algo Aconteça

## 🎮 Contexto do Freela
No pipeline de CI/CD da FreshBox, precisamos aguardar que a aplicação suba e responda com sucesso antes de iniciar os testes automatizados. O tempo de inicialização varia, então um tempo de espera estático (`sleep 60`) ou é lento demais ou falha se a aplicação demorar um pouco mais. Um loop condicional (`while` ou `until`) resolve perfeitamente!

## 🛠️ Missão
1. Crie o script em `/home/operator/wait_service.sh`.
2. Use a estrutura de repetição `while` ou `until` para fazer requisições via `curl` ao endpoint `http://app01.freshbox.internal/health`.
3. Adicione um tempo de espera (como `sleep 5`) entre as tentativas.
4. Implemente um controle de timeout para que o script não fique rodando eternamente se a aplicação falhar de vez (por exemplo, limite a 60 segundos no total). Se atingir o timeout, o script deve terminar com `exit 1`.
5. Torne o script executável (`chmod +x`).

## 💡 Dicas e Exemplo de Estrutura
O comando `curl -sf` é ideal para healthchecks pois retorna um exit code de erro se a página retornar um código HTTP diferente de 200/300.
```bash
#!/bin/bash
set -euo pipefail

MAX_WAIT=60
ELAPSED=0
SERVICE_URL="http://app01.freshbox.internal/health"

echo "Aguardando serviço em $SERVICE_URL..."

until curl -sf "$SERVICE_URL" > /dev/null 2>&1; do
    if [ "$ELAPSED" -ge "$MAX_WAIT" ]; then
        echo "Erro: Timeout atingido sem resposta da API."
        exit 1
    fi
    echo "Serviço ainda não respondeu. Aguardando 5s... (${ELAPSED}s passados)"
    sleep 5
    ELAPSED=$((ELAPSED + 5))
done

echo "Sucesso! O serviço está no ar!"
```

## 🎯 Critério de Sucesso
* O script `/home/operator/wait_service.sh` deve existir e ter permissão de execução.
* Deve usar a estrutura `while` ou `until`.
* Deve executar o loop e sair com sucesso (`exit 0`) assim que o `curl` responder com sucesso (a partir do 3º teste simulado pelo mock).
* Se o serviço nunca responder, deve respeitar o timeout e retornar `exit 1`.
