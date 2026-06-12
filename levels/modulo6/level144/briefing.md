# Nível 144 — Mesclando Realidades (Merge)

## 🎮 Contexto do Freela
A equipe de QA testou e aprovou a branch `feature/taxas-api` contendo os novos cálculos de taxas de transação. Agora é hora de trazer essas modificações de volta para a branch de produção principal (`master`) sem perder o histórico de commits.

## 🛠️ Missão
1. Navegue para o repositório `/home/operator/api`.
2. Mude de volta para a branch principal `master`:
   * `git checkout master` ou `git switch master`
3. Execute a mesclagem (merge) da branch de feature para a master:
   * `git merge feature/taxas-api`
4. Garanta que a mesclagem foi bem-sucedida e que as alterações estão visíveis na `master`.

## 🎯 Critério de Sucesso
* A branch ativa deve ser `master`.
* O arquivo `app.js` na master deve conter as alterações feitas na feature (a linha contendo `TAX_RATE`).
* O histórico de commits da branch `master` deve conter o commit feito na branch de feature.
