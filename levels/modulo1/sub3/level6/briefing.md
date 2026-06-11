# Nível 26 — Lendo Arquivos GZ sem Descompactar

## 🎮 Contexto do Freela
Você está trabalhando em um servidor embarcado de monitoramento com memória RAM extremamente limitada e pouco armazenamento disponível. Descompactar arquivos de log gigantescos (`.gz`) pode estourar o disco e derrubar o sistema. O suporte precisa que você encontre a chave de segurança secreta salva no histórico de boot compactado em `/home/operator/log_antigo.log.gz`.

## 🛠️ Missão
1. Encontre o valor da variável `SECRET_ACCESS_KEY` dentro do arquivo compactado `/home/operator/log_antigo.log.gz` **sem descompactá-lo no disco**.
2. Salve apenas o valor da chave (exemplo: `KEY_DEC_8891_AURA_SECURE`) dentro de um novo arquivo chamado `/home/operator/chave.txt`.
3. **Restrição**: O arquivo `log_antigo.log.gz` deve permanecer compactado e nenhum arquivo `log_antigo.log` deve ser criado.

## 📝 Comandos Úteis
*   `zcat`: Equivalente ao `cat`, mas para arquivos compactados com gzip (lê diretamente na memória e joga para a saída padrão).
    *   Exemplo: `zcat arquivo.gz`
*   `zgrep`: Executa uma busca por expressões regulares diretamente em arquivos compactados.
    *   Exemplo: `zgrep "termo" arquivo.gz`
*   Redirecionamento `>`: Envia a saída do comando para um novo arquivo.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/chave.txt` deve conter exatamente a chave `KEY_DEC_8891_AURA_SECURE` e o arquivo original de log deve continuar compactado no disco.
