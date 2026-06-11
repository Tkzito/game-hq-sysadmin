# Nível 45 — O Modo Getopts Simples

## 🎮 Contexto do Freela
Sua ferramenta precisa aceitar opções no padrão clássico do Linux. A forma profissional de fazer isso em Bash é usando a função builtin `getopts`.

## 🛠️ Missão
Escreva um script `/home/operator/config_flags.sh` que utilize `getopts` para tratar duas opções:
- `-v`: Ativa o modo verboso. Deve imprimir `MODO_VERBOSO=ATIVO`.
- `-f`: Especifica um arquivo. Deve imprimir `ARQUIVO=<valor_da_opcao>`.

Exemplo: `./config_flags.sh -v -f config.json` deve imprimir:
`MODO_VERBOSO=ATIVO`
`ARQUIVO=config.json`

## 📝 Comandos Úteis
*   `while getopts "vf:" opt; do`: loop clássico do getopts. O `:` depois de `f` indica que a opção `-f` exige um argumento (`$OPTARG`).

## 🎯 Critério de Sucesso
O script `/home/operator/config_flags.sh` deve fazer o parse adequado das opções passadas e imprimir no formato esperado.
