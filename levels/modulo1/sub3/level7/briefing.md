# Nível 27 — Caça ao Tesouro com 'find'

## 🎮 Contexto do Freela
Um antigo desenvolvedor ocultou uma chave privada PEM necessária para acessar a rede neural da AURA-7 em algum lugar dentro do diretório `/home/operator/sistema/`. Com centenas de pastas e subpastas aninhadas, tentar achar o arquivo manualmente com `ls` e `cd` seria extremamente ineficiente e demorado.

## 🛠️ Missão
1. Use a ferramenta `find` para localizar o arquivo de extensão `.pem` (ou que contenha a palavra `key`) dentro de `/home/operator/sistema/`.
2. Quando encontrar o arquivo, salve o seu **caminho absoluto** (ex: `/home/operator/sistema/diretorio/arquivo.pem`) em um novo arquivo chamado `/home/operator/caminho_chave.txt`.

## 📝 Comandos Úteis
*   `find`: Excelente comando para buscar arquivos recursivamente baseado em critérios.
    *   Exemplo para buscar pelo nome: `find /caminho/de/busca -name "*.pem"`
    *   Exemplo ignorando maiúsculas/minúsculas: `find /caminho/de/busca -iname "*key*"`

## 🎯 Critério de Sucesso
O arquivo `/home/operator/caminho_chave.txt` deve conter exatamente a linha com o caminho do arquivo `aura_private_key.pem` encontrado pelo comando `find`.
