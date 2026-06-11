# Nível 41 — O Primeiro Parâmetro

## 🎮 Contexto do Freela
Você precisa consertar um script de saudação automatizado da nave. O script anterior foi danificado pela oscilação de energia e não reconhece mais quem o está chamando.

## 🛠️ Missão
Crie ou edite o script `/home/operator/saudacao.sh` para que ele receba um nome como o primeiro argumento (`$1`) da linha de comando e imprima exatamente a mensagem: `Olá, <nome>!`.
Se o script for chamado com `saudacao.sh AURA`, ele deve imprimir `Olá, AURA!`.

## 📝 Comandos Úteis
*   `$1`: Representa o primeiro argumento posicional passado ao script.
*   `chmod +x`: Torna o script executável.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/saudacao.sh` deve ser executável, receber o argumento e retornar `Olá, <argumento>!`.
