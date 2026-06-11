# Nível 21 — Backup com Preservação de Atributos

## 🎮 Contexto do Freela
Você acessou um servidor de banco de dados secundário que foi afetado por uma instabilidade elétrica. A equipe técnica precisa que os arquivos da pasta `/home/operator/dados_originais/` sejam copiados para `/home/operator/dados_backup/`. 

No entanto, há um detalhe crucial: as chaves e os arquivos de configuração têm permissões estritas e datas de modificação que são usadas por scripts legados de auditoria. Uma cópia simples (`cp`) alteraria o dono, a data e possivelmente as permissões, quebrando o sistema de integridade.

## 🛠️ Missão
Copie todo o conteúdo do diretório `/home/operator/dados_originais/` para um novo diretório chamado `/home/operator/dados_backup/`, garantindo que todas as permissões (permissões de leitura/escrita) e timestamps (datas de modificação) originais sejam **100% preservados**.

## 📝 Comandos Úteis
*   `cp`: Copia arquivos e diretórios. Use com as flags adequadas para recursão e preservação de atributos (dica: veja as opções `-p`, `-r`, ou `-a`).
*   `stat`: Exibe detalhes sobre o status de um arquivo ou diretório (incluindo permissões e datas).

## 🎯 Critério de Sucesso
O diretório `/home/operator/dados_backup` deve existir contendo as cópias exatas dos arquivos com as mesmas permissões (`600` e `400`) e datas de modificação originais.
