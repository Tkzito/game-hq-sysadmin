# Nível 71 — Redirecionando a Saída Padrão (stdout)

## 🎮 Contexto do Freela
Você conseguiu restabelecer a comunicação inicial com AURA-7, mas o subsistema de energia auxiliar do abrigo solar está oscilando. A IA precisa do relatório atual de consumo para recalcular a distribuição de energia. Ela disponibilizou um script chamado `gerar_relatorio.sh` no seu diretório home.

## 🛠️ Missão
Execute o script `/home/operator/gerar_relatorio.sh` e redirecione a sua saída padrão (stdout) para o arquivo `/home/operator/output.log`.
Use o operador de redirecionamento `>` para enviar a saída ao arquivo, sobrescrevendo qualquer conteúdo existente.

## 📝 Comandos Úteis
*   `>`: Redireciona a saída padrão (stdout) de um comando para um arquivo.
*   `./gerar_relatorio.sh`: Executa o script gerador.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/output.log` deve existir e conter todo o texto gerado pela execução do script `gerar_relatorio.sh`. A validação também verificará se você utilizou o redirecionador no seu histórico de comandos.
