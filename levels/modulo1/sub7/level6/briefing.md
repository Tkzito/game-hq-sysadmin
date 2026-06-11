# Nível 66 — Parsing de Seções INI

## 🎮 Contexto do Freela
Muitos arquivos de configuração legados usam o formato INI, dividido em seções demarcadas por `[secao]`. Precisamos extrair valores apenas de uma seção específica.

## 🛠️ Missão
Escreva o script `/home/operator/obter_db.sh`.
Ele deve fazer o parsing do arquivo `/home/operator/app.ini` e exibir apenas as linhas contendo as chaves da seção `[database]` (remover as linhas da seção `[api]` ou outras).
A saída na tela deve conter as linhas originais chave=valor da seção `[database]`.

## 📝 Comandos Úteis
*   Você pode usar um controle de flag simples no `while read`: se encontrar `[database]`, ativa `imprimir=true`, se encontrar outra seção tipo `[api]`, define `imprimir=false`.

## 🎯 Critério de Sucesso
O script deve extrair e exibir na saída as chaves-valores exclusivas da seção `[database]`.
