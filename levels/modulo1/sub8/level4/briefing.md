# Nível 74 — Adicionando Dados a um Arquivo (Appending Output)

## 🎮 Contexto do Freela
Você precisa adicionar uma nova entrada de status do sistema ao arquivo `/home/operator/system.log`. Este arquivo de log já possui registros importantes de boot e diagnósticos anteriores. Se você usar o operador `>`, todos os registros antigos serão destruídos. Para evitar perda de dados, você deve adicionar a nova linha ao final do arquivo existente.

## 🛠️ Missão
Adicione exatamente a mensagem `SYS: Servico AURA online` como uma nova linha ao final do arquivo `/home/operator/system.log` sem apagar os dados que já estão no arquivo.

## 📝 Comandos Úteis
*   `>>`: Redireciona a saída de um comando para o final de um arquivo, anexando-a sem apagar o conteúdo atual.
*   `echo`: Exibe a string de texto a ser gravada.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/system.log` deve conter os registros anteriores intactos, seguidos pela nova linha `SYS: Servico AURA online`. A validação confirmará se a integridade do histórico do log foi mantida e se o operador `>>` foi empregado.
