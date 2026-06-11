# Nível 24 — Compactação com tar e gzip

## 🎮 Contexto do Freela
Você acaba de isolar um diretório contendo arquivos de evidências de um ataque hacker em `/home/operator/evidencias/`. A equipe de resposta a incidentes precisa que esses arquivos sejam empacotados e compactados em um único arquivo compactado para transferência segura e economia de espaço no servidor de auditoria.

## 🛠️ Missão
Compacte a pasta `/home/operator/evidencias/` em um único arquivo tarball compactado com gzip chamado `/home/operator/evidencias.tar.gz`.

## 📝 Comandos Úteis
*   `tar`: Utilitário para empacotamento. As flags comuns para criar um arquivo compactado com gzip são `-c` (create), `-z` (gzip), `-v` (verbose - opcional), `-f` (file).
    *   Exemplo de uso: `tar -czf arquivo.tar.gz pasta_origem`

## 🎯 Critério de Sucesso
O arquivo `/home/operator/evidencias.tar.gz` deve ser gerado, ser legível pelo utilitário `tar -tzf` e conter a estrutura da pasta `evidencias` com todos os três arquivos originais lá dentro.
