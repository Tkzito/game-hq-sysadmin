# Nível 38 — Diagnosticando Processos com 'ps' e 'kill'

## 🎮 Contexto do Freela
Você está tentando executar o script de deploy `/home/operator/deploy.sh`, mas ele falha repetidamente alegando que um processo fantasma chamado `solar_leak.sh` está rodando em segundo plano e travando as portas de comunicação de controle do painel solar. Para realizar o deploy, você precisa encontrar esse processo e terminá-lo.

## 🛠️ Missão
1. Liste os processos em execução no sistema para encontrar o Identificador de Processo (PID) correspondente ao script `solar_leak.sh`.
2. Envie um sinal de finalização para esse processo usando o comando `kill` seguido do PID encontrado.
3. Certifique-se de que o processo foi encerrado com sucesso.
4. Execute o script `/home/operator/deploy.sh` para concluir o deploy das configurações de energia solar.

## 📝 Comandos Úteis
*   `ps aux`: Lista todos os processos rodando no sistema com detalhes de dono, PID e comando executado.
*   `pgrep [nome]`: Retorna diretamente o PID dos processos que casam com o nome fornecido.
*   `kill [PID]`: Envia o sinal de finalização padrão (SIGTERM) para o processo com o PID informado.
    *   Exemplo: `kill 1234`

## 🎯 Critério de Sucesso
O processo `solar_leak.sh` deve ser morto e o script `./deploy.sh` deve ser executado com sucesso, criando o arquivo `/home/operator/deploy_status.txt` com o conteúdo `DEPLOY_STATUS=OK`.
