# Nível 58 — Extração Cirúrgica (-o)

## 🎮 Contexto do Freela
Às vezes você não quer ver a linha inteira que bate com a regex, mas sim apenas o trecho exato correspondente ao padrão. A flag `-o` (only-matching) do grep faz exatamente isso.

## 🛠️ Missão
Extraia apenas os endereços de email que constam no arquivo `/home/operator/contatos.db`. Cada email deve aparecer em uma linha isolada.

## 📝 Comandos Úteis
*   `grep -Eo "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"`: Uma regex padrão para casamento de e-mails, usada junto a `-o` para extrair apenas a correspondência.

## 🎯 Critério de Sucesso
Filtre e extraia com sucesso apenas os e-mails usando `grep -Eo` e uma regex condizente.
