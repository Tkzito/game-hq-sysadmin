# Nível 110 — [Desafio Prático Integrado] A Constituição da Farmácia

## 🎮 Contexto do Freela
Chegou a hora de consolidar as políticas de segurança da farmácia. Edite o arquivo de regras `/etc/sudoers` usando a ferramenta de validação segura para permitir que o grupo `%caixas` tenha direitos administrativos limitados.

## 🛠️ Missão
1. Edite o arquivo `/etc/sudoers` usando `visudo` para incluir uma regra delegando acesso ao grupo `%caixas` ou usuário `auxiliar`.

## 🎯 Critério de Sucesso
* Inclusão de regra para `%caixas` ou `auxiliar` no arquivo `/etc/sudoers` sem causar erros de sintaxe (validado via `visudo -c`).
