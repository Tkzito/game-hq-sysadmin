# Nível 3 — Explorando os Arquivos Ocultos

## 🎮 Contexto do Freela
Os painéis solares do laboratório estão operando com apenas 10% da capacidade. Para liberar a carga máxima, AURA-7 precisa de um código de validação que foi salvo no diretório home pelo administrador anterior. No entanto, por questões de segurança, ele salvou o arquivo como oculto para não aparecer em listagens comuns.

## 🛠️ Missão
1. Liste todos os arquivos do seu diretório atual, incluindo os ocultos.
2. Identifique o arquivo oculto de chave da bateria.
3. Copie o conteúdo exato deste arquivo (a chave) para um novo arquivo chamado `chave_ativacao.txt` no seu diretório home (`/home/operator`).

## 📝 Comandos Úteis
*   `ls`: Lista os arquivos do diretório.
*   `ls -a` ou `ls -la`: Lista todos os arquivos, incluindo ocultos (que começam com um ponto `.`).
*   `cat <arquivo>`: Mostra o conteúdo de um arquivo.
*   `echo "conteudo" > arquivo.txt` ou redirecionamento de comando para criar o arquivo com a chave.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/chave_ativacao.txt` deve conter exatamente a chave `CHAVE-SOLAR-9982`.
