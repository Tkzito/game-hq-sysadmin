# Nível 78 — Contando Saídas com Pipe e wc

## 🎮 Contexto do Freela
Nosso sistema de segurança detectou um comportamento anômalo de tentativas de login falhas. Os logs foram capturados no arquivo `/home/operator/seguranca.log`. Para estimar a urgência da ameaça, precisamos saber a quantidade exata de tentativas de login que falharam. Cada falha contém a palavra-chave `FAIL`.

## 🛠️ Missão
Use pipes para filtrar as linhas com o termo `FAIL` do arquivo `/home/operator/seguranca.log` com `grep`, conte o número dessas linhas usando o comando `wc -l` e salve apenas este número no arquivo `/home/operator/tentativas_invasao.txt`.

## 📝 Comandos Úteis
*   `wc -l`: Conta a quantidade de linhas recebidas na entrada padrão.
*   `grep 'TERMO'`: Filtra linhas com o termo especificado.
*   `|`: Redireciona a saída de um comando para a entrada do outro.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/tentativas_invasao.txt` deve conter exatamente o valor numérico `4`. A validação irá verificar a existência do arquivo, o conteúdo dele e se você usou o comando `wc` no seu histórico.
