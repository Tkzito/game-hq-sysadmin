# Nível 9 — Identificando Tipos e Contando Linhas

## 🎮 Contexto do Freela
Você recebeu três blobs binários/arquivos de dados recuperados do disco rígido corrompido de AURA-7: `arquivoA`, `arquivoB` e `arquivoC` (todos dentro da pasta `/home/operator/dados`). Um deles contém um conjunto legível de configurações em texto simples (ASCII) e os outros dois são binários compactados ou formatos proprietários que não podem ser lidos como texto. Você precisa encontrar qual é o de texto e descobrir o número de linhas dele.

## 🛠️ Missão
1. Analise o tipo de arquivo de `arquivoA`, `arquivoB` e `arquivoC` usando o comando `file`.
2. Identifique qual deles é o arquivo de texto plano (ASCII).
3. Use a ferramenta `wc` com a opção apropriada para contar o número de linhas desse arquivo de texto.
4. Escreva apenas o número de linhas (sem o nome do arquivo) em um arquivo chamado `resultado_contagem.txt` no seu diretório home (`/home/operator`).

## 📝 Comandos Úteis
*   `file <caminho_do_arquivo>`: Determina a assinatura mágica e o tipo real do arquivo (independente de extensão).
*   `wc -l <arquivo>`: Conta o número de linhas (quebras de linha `\n`) em um arquivo.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/resultado_contagem.txt` deve conter exatamente o número de linhas do arquivo de texto correto (que é 42).
