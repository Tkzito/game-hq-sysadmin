# Nível 147 — O Guardião do Código (Hook pre-commit)

## 🎮 Contexto do Freela
Alguns desenvolvedores da TechVanguard continuam vazando chaves de API (`PRIVATE_KEY`) e senhas (`PASSWORD`) no repositório de testes. Para evitar vazamento de credenciais na nuvem, vamos configurar um Git Hook local que atua como um inspetor automático antes de permitir que o commit seja consolidado.

## 🛠️ Missão
1. Navegue para o repositório local em `/home/operator/api`.
2. Crie ou edite o script no arquivo de hook local:
   `/home/operator/api/.git/hooks/pre-commit`
3. O script do hook deve interceptar a ação de commit e:
   * Analisar se os arquivos adicionados para o commit contêm os termos confidenciais `PRIVATE_KEY` ou `PASSWORD`.
   * Se algum desses termos for encontrado, imprimir um alerta e encerrar com status de erro (como `exit 1`), bloqueando o commit.
   * Caso contrário, permitir o commit com sucesso (`exit 0`).
4. Torne o hook executável usando `chmod +x /home/operator/api/.git/hooks/pre-commit`.

## 💡 Dicas e Exemplo de Estrutura
Você pode criar um script simples em Bash que busca recursivamente nos arquivos indexados ou modificados:
```bash
#!/bin/bash
set -euo pipefail

# Buscar termos proibidos nos arquivos modificados/adicionados no stage
if git diff --cached --name-only | xargs grep -E "PRIVATE_KEY|PASSWORD" > /dev/null 2>&1; then
    echo "ERRO: O commit contém credenciais sensíveis expostas (PRIVATE_KEY ou PASSWORD). Bloqueado!"
    exit 1
fi

exit 0
```

## 🎯 Critério de Sucesso
* O hook `.git/hooks/pre-commit` deve existir no repositório do operador e ser executável.
* Tentativas de fazer commits de arquivos que contenham a palavra `PRIVATE_KEY` ou `PASSWORD` devem ser bloqueadas pelo hook.
* Commits normais que não possuam essas palavras-chave devem ser concluídos sem bloqueios.
