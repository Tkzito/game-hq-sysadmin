# Nível 23 — Remoção Cirúrgica com 'rm'

## 🎮 Contexto do Freela
O disco do servidor está quase cheio. Há dezenas de arquivos temporários `.tmp` de cache criados por processos antigos que não foram devidamente encerrados. No entanto, dentro da mesma árvore de diretórios, existem arquivos vitais de banco de dados (`.db`) e chaves criptográficas (`.key`) que não podem ser perdidos sob hipótese alguma.

## 🛠️ Missão
Remova recursivamente todos os arquivos com extensão `.tmp` localizados sob `/home/operator/temp_files/`.
*   **ATENÇÃO**: Não delete o arquivo `/home/operator/temp_files/do_not_delete_database.db` nem `/home/operator/temp_files/nested_temp/keep_this_too.key`.
*   Não delete os diretórios em si, apenas os arquivos de cache temporário.

## 📝 Comandos Úteis
*   `rm`: Remove arquivos ou diretórios. Use com cuidado.
*   Você pode usar um comando simples para caminhos específicos ou utilizar coringas (ex: `rm /home/operator/temp_files/*.tmp` e `rm /home/operator/temp_files/*/*.tmp`).
*   Outra alternativa robusta seria usar o comando `find` com a opção `-name` e `-delete` (ou combinando com `xargs` / `-exec rm`), mas para este nível básico, a remoção simples apontando para os arquivos já resolve.

## 🎯 Critério de Sucesso
Nenhum arquivo `.tmp` deve restar na árvore `/home/operator/temp_files/`, e todos os arquivos `.db` e `.key` devem permanecer intactos.
