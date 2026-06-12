# Nível 146 — Conectando Repositórios Remotos

## 🎮 Contexto do Freela
Manter o código-fonte apenas no seu computador local é um grande risco de segurança. A TechVanguard contratou um servidor centralizado para armazenar os repositórios Git da corporação. Agora, precisamos conectar nosso repositório local a este repositório remoto ("remote") e enviar nosso histórico.

## 🛠️ Missão
1. Navegue para a pasta do repositório local em `/home/operator/api`.
2. Adicione um repositório remoto de nome `origin` apontando para a seguinte URL corporativa:
   `git@github.com:techvanguard/api.git`
   * Comando: `git remote add origin git@github.com:techvanguard/api.git`
3. Envie seus commits da branch local `master` para o repositório remoto:
   * Comando: `git push -u origin master`
   (Dica: Um redirecionador interno no container simulará a conexão enviando as alterações para o servidor local bare `/var/git/api.git`, então você não precisa de internet ou chaves SSH reais).

## 🎯 Critério de Sucesso
* O remote `origin` deve estar cadastrado e apontar exatamente para `git@github.com:techvanguard/api.git`.
* A branch remota de destino deve estar perfeitamente sincronizada com a sua branch `master` local (o hash do HEAD local deve corresponder ao HEAD do servidor bare em `/var/git/api.git`).
