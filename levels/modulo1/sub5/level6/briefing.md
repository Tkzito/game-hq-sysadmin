# Nível 46 — Parâmetros Robustos com Getopts

## 🎮 Contexto do Freela
Agora você precisa configurar dados de um novo operador no banco de dados local da nave. O script deve receber o nome e a idade do usuário usando opções nomeadas.

## 🛠️ Missão
Crie o script `/home/operator/usuario.sh` para ler:
- A opção `-n` (Nome) -> Armazena e exibe `NOME=<valor>`
- A opção `-a` (Idade) -> Armazena e exibe `IDADE=<valor>`

Se qualquer outra opção for informada, o script deve exibir `Opcao invalida.` e sair com exit code `1`.

Exemplo: `./usuario.sh -n "AURA" -a 4` deve produzir:
`NOME=AURA`
`IDADE=4`

## 📝 Comandos Úteis
*   `getopts "n:a:" opt`: Parsing para ambas as opções com argumentos obrigatórios.
*   `\?`: Padrão do case para opções inválidas.

## 🎯 Critério de Sucesso
O script `/home/operator/usuario.sh` deve processar corretamente as opções, rejeitar opções inválidas com retorno `1`.
