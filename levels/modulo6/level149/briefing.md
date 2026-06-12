# Nível 149 — Validação de Estrutura YAML (Linting)

## 🎮 Contexto do Freela
Sintaxe YAML é extremamente sensível à quantidade de espaços e indentações. Um único espaço desalinhado invalida a pipeline de integração contínua (CI/CD) e impede o deploy. Para garantir o alinhamento, os desenvolvedores precisam validar seus arquivos YAML antes do commit.

## 🛠️ Missão
1. Navegue para `/home/operator/api`.
2. Abra o arquivo de deploy `/home/operator/api/deploy.yml`.
3. Corrija o desalinhamento e a indentação incorreta no arquivo. (Dica: o parser de YAML espera espaços de indentação consistentes).
4. O arquivo deve passar no teste de validação sintática do Python:
   `python3 -c "import yaml; yaml.safe_load(open('deploy.yml'))"`

## 💡 Dicas e Exemplo de Estrutura
O arquivo original possui este problema de indentação:
```yaml
version: "3"
services:
  api:
    image: techvanguard/api:latest
   ports: # <-- Apenas 3 espaços! Deveriam ser 4 espaços para alinhar com 'image'
      - "8080:8080"
```

Corrija a linha do `ports:` e a lista subsequente para ficarem sob a chave do serviço correspondente.

## 🎯 Critério de Sucesso
* O arquivo `/home/operator/api/deploy.yml` deve estar estruturalmente correto.
* O comando de validação do Python `python3 -c "import yaml; yaml.safe_load(open('deploy.yml'))"` deve rodar e encerrar com sucesso (sem apresentar erros de parser).
