# Nível 75 — Descartando Saídas no /dev/null

## 🎮 Contexto do Freela
O sensor térmico do reator está mandando um fluxo constante de logs insignificantes de debug e de pequenos erros de calibração que poluem completamente o console. O script `/home/operator/sensor_noise.sh` simula este fluxo de ruído. Para manter o terminal livre para as próximas tarefas, você precisa rodar este script, mas descartar **toda e qualquer saída** (stdout e stderr) gerada por ele, enviando-as para o dispositivo nulo do sistema (`/dev/null`).

## 🛠️ Missão
Execute o script `/home/operator/sensor_noise.sh` e redirecione toda a sua saída (tanto stdout quanto stderr) de forma que nada seja exibido na tela, descartando-as no arquivo especial `/dev/null`.

## 📝 Comandos Úteis
*   `/dev/null`: O "buraco negro" dos sistemas Unix. Tudo gravado nele é descartado imediatamente.
*   `&> /dev/null`: Redireciona ambas as saídas para o dispositivo nulo.
*   `> /dev/null 2>&1`: Método tradicional para enviar stdout e stderr para o `/dev/null`.

## 🎯 Critério de Sucesso
Você deve executar o script e silenciar totalmente suas saídas. A validação inspecionará o histórico de comandos para garantir que `/dev/null` foi utilizado corretamente para filtrar tanto o stdout quanto o stderr da chamada do script.
