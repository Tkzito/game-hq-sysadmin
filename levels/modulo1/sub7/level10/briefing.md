# Nível 70 — O Configurador do Dashboard

## 🎮 Contexto do Freela
Como orquestrador final do submódulo, você deve escrever um script completo que automatize o carregamento de configurações do dashboard principal do operador.

## 🛠️ Missão
Escreva o script `/home/operator/configurar_dashboard.sh`. Ele deve:
1. Ler o arquivo `/home/operator/.dashboard.env`.
2. Ignorar linhas vazias e linhas iniciadas com `#`.
3. Exportar todas as variáveis válidas lidas no arquivo para o escopo do script.
4. Ao final, ele deve exibir:
`Painel: <DASHBOARD_NAME> | Porta: <DASHBOARD_PORT>`

Se `DASHBOARD_NAME` ou `DASHBOARD_PORT` não estiverem definidos após carregar as chaves, printe `Erro de Inicializacao` e saia com exit `1`.

## 🎯 Critério de Sucesso
O script `/home/operator/configurar_dashboard.sh` deve ler, validar, exportar e imprimir corretamente os dados do dashboard ou falhar de acordo.
