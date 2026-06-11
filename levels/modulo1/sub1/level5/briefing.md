# Nível 5 — Investigando o Log de Falhas

## 🎮 Contexto do Freela
O módulo de áudio de AURA-7 parou de funcionar subitamente. Um relatório contendo centenas de linhas foi despejado no arquivo `/home/operator/sistema.log`. Ler o arquivo inteiro linha por linha seria exaustivo. Você sabe que os erros cruciais geralmente ocorrem perto do final do processo de inicialização.

## 🛠️ Missão
1. Analise o arquivo de log `/home/operator/sistema.log`.
2. Descubra qual é o código de erro (`ERR-...`) citado nas últimas linhas do arquivo.
3. Crie um arquivo chamado `codigo_erro.txt` contendo apenas esse código de erro (sem espaços adicionais ou outras palavras).

## 📝 Comandos Úteis
*   `cat <arquivo>`: Exibe todo o conteúdo do arquivo (pode inundar o console se o arquivo for longo).
*   `tail -n <numero> <arquivo>`: Mostra as últimas N linhas de um arquivo. Perfeito para logs recentes! (Ex: `tail -n 10 sistema.log`).
*   `head -n <numero> <arquivo>`: Mostra as primeiras N linhas do arquivo.
*   `less <arquivo>`: Permite navegar pelo arquivo interativamente usando as setas do teclado (aperte `q` para sair).

## 🎯 Critério de Sucesso
O arquivo `/home/operator/codigo_erro.txt` deve conter exatamente a string `ERR-AUDIO-909`.
