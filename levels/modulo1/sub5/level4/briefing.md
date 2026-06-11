# Nível 44 — O Descarte de Cabeçalho (shift)

## 🎮 Contexto do Freela
Em scripts de processamento de comandos, muitas vezes o primeiro argumento é a 'ação' e os demais são os 'alvos'. O comando `shift` permite descartar o primeiro argumento e rotacionar a lista.

## 🛠️ Missão
Escreva o script `/home/operator/shift_test.sh` que:
1. Printe `Acao: <primeiro_argumento>`
2. Execute o comando `shift` para remover o primeiro argumento.
3. Printe `Alvos: <argumentos_restantes>` (com todos os demais argumentos separados por espaço).

Exemplo: `./shift_test.sh deploy servidor1 servidor2` deve imprimir:
`Acao: deploy`
`Alvos: servidor1 servidor2`

## 📝 Comandos Úteis
*   `shift`: Remove o primeiro argumento posicional (`$1`), movendo `$2` para `$1`, etc.
*   `$*` ou `$@`: Contém os argumentos restantes após o shift.

## 🎯 Critério de Sucesso
O script `/home/operator/shift_test.sh` deve utilizar o comando `shift` e formatar a saída corretamente.
