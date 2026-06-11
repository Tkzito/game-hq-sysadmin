# Nível 49 — Exibindo a Ajuda (Usage)

## 🎮 Contexto do Freela
Sistemas profissionais exibem uma mensagem de uso e ajuda (Usage) quando recebem flags inválidas ou quando os argumentos obrigatórios não são passados.

## 🛠️ Missão
Crie o script `/home/operator/ajuda.sh`.
Se ele for chamado com `-h` ou `--help`, ou se nenhum argumento for passado, ele deve exibir na saída padrão (stdout) exatamente a seguinte mensagem de ajuda e sair com exit code `0`:
`Uso: ajuda.sh [opcao]`
`Opcoes:`
`  -h, --help    Mostra esta mensagem de ajuda`
`  -s, --status  Exibe o status do sistema`

Se for chamado com `-s` ou `--status`, deve imprimir `Status: OK` e sair com `0`.
Qualquer outro argumento deve gerar a mensagem `Erro: Opcao invalida. Use -h para ajuda.` no stderr (saída de erro) e retornar exit code `1`.

## 🎯 Critério de Sucesso
O script `/home/operator/ajuda.sh` deve gerenciar corretamente as mensagens de ajuda, saída de status e tratamento de erros no stderr.
