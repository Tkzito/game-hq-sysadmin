# Nível 72 — Redirecionando a Saída de Erros (stderr)

## 🎮 Contexto do Freela
O sistema de rede está apresentando falhas intermitentes. AURA-7 tentou se conectar aos outros nodos do laboratório, mas as requisições falharam. Ela deixou um script de diagnóstico chamado `/home/operator/testar_conexao.sh` no seu diretório. Para depurarmos o problema sem poluição visual, precisamos isolar apenas as falhas de conexão em um log de erros dedicado.

## 🛠️ Missão
Execute o script `/home/operator/testar_conexao.sh` e redirecione **apenas** a saída de erros (stderr) para `/home/operator/errors.log`.
A saída padrão (stdout) do script deve continuar a ser exibida no terminal (ou descartada, mas não enviada para o arquivo de erros).

## 📝 Comandos Úteis
*   `2>`: Redireciona especificamente a saída de erros (descritor de arquivo 2) para um arquivo.
*   `./testar_conexao.sh`: Executa o diagnóstico de conexão.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/errors.log` deve ser criado e conter unicamente a linha de erro `ALERTA: Gateway 10.0.0.1 offline ou inacessível`. A validação confirmará se a saída padrão foi mantida fora do arquivo e se o redirecionamento `2>` foi utilizado.
