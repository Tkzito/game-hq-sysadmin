# Nível 12 — Comentários e Legibilidade (Boas Práticas)

## 🎮 Contexto do Freela
Escrever scripts sem documentação é uma receita certa para dores de cabeça no futuro. O script `/home/operator/limpar_logs.sh` faz uma manutenção periódica de arquivos temporários, mas não tem explicações. Em equipes de engenharia de software e SRE, todo código precisa ter comentários curtos e explicativos de suas funções essenciais.

## 🛠️ Missão
1. Abra e edite o arquivo `/home/operator/limpar_logs.sh`.
2. Adicione ao menos 2 linhas de comentários iniciando com o caractere `#` (excluindo a Shebang) para documentar as etapas do script. Por exemplo:
   *   Explicar que o script remove os logs temporários que casam com a máscara `temp_*.log`.
   *   Explicar que o script imprime uma mensagem de sucesso no final.

## 📝 Comandos Úteis
*   No Bash, qualquer linha iniciada por `#` (com exceção da shebang `#!/bin/...` na linha 1) é interpretada como comentário e ignorada pelo shell.
*   Use `nano limpar_logs.sh` para editar.

## 🎯 Critério de Sucesso
O validador irá analisar o arquivo `/home/operator/limpar_logs.sh` e garantirá que existam pelo menos duas linhas comentadas explicando a lógica.
