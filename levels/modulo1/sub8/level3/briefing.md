# Nível 73 — Redirecionando Ambas as Saídas (stdout e stderr)

## 🎮 Contexto do Freela
Você está executando a rotina de backup dos arquivos de configuração da AURA-7 com o script `/home/operator/backup.sh`. Para fins de auditoria detalhada, a IA requer que todas as informações geradas por esse processo — tanto as mensagens normais de progresso (stdout) quanto os avisos/alertas de erro (stderr) — sejam gravados juntos em um único arquivo de log chamado `/home/operator/combined.log`.

## 🛠️ Missão
Execute o script `/home/operator/backup.sh` redirecionando tanto o stdout quanto o stderr para o arquivo `/home/operator/combined.log`.

## 📝 Comandos Úteis
*   `&>`: Atalho do Bash moderno para redirecionar tanto a saída padrão quanto a de erro para um arquivo.
*   `> arquivo 2>&1`: Forma tradicional e compatível com POSIX para redirecionar o descritor 1 para o arquivo e o descritor 2 para o descritor 1 (2>&1).

## 🎯 Critério de Sucesso
O arquivo `/home/operator/combined.log` deve ser gerado e conter todas as 3 mensagens impressas pelo script `backup.sh` (as mensagens normais e o alerta de espaço reduzido). A validação lerá o conteúdo do arquivo e inspecionará o histórico para confirmar a utilização de `&>` ou `2>&1`.
