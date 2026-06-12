# Nível 145 — O Grande Conflito de Merge

## 🎮 Contexto do Freela
Conflitos acontecem quando duas pessoas editam a mesma linha de um mesmo arquivo em branches diferentes. No repositório `/home/operator/api`, a branch de produção (`master`) e a branch de desenvolvimento (`feature/porta-dev`) alteraram a porta da API no arquivo `app.conf` ao mesmo tempo. Ao tentar fazer o merge, o Git travou no estado de conflito e precisa da intervenção humana para decidir o que salvar.

## 🛠️ Missão
1. Navegue para `/home/operator/api`.
2. Abra o arquivo `app.conf` com o seu editor de texto de preferência.
3. Localize e remova os marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`).
4. Edite o arquivo mantendo a porta de produção configurada para **9000** (ou seja, a linha deve ficar exatamente: `PORT=9000`).
5. Adicione o arquivo resolvido ao stage com `git add app.conf`.
6. Finalize o processo de merge com um commit contendo exatamente a mensagem:
   `fix: resolve conflito de porta na API`

## 🎯 Critério de Sucesso
* O conflito deve ser resolvido no arquivo `app.conf` sem deixar nenhum marcador residual.
* O arquivo `app.conf` deve conter o valor final da porta como `9000`.
* O merge deve ser concluído (o arquivo `.git/MERGE_HEAD` não deve existir).
* O commit de resolução deve ser registrado com a mensagem especificada.
