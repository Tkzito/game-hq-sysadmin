# Nível 148 — Deploy Automatizado (Hook post-receive)

## 🎮 Contexto do Freela
Chega de deploys via FTP! Na TechVanguard, queremos que o código seja implantado em produção automaticamente no servidor assim que um desenvolvedor fizer `git push`. Usaremos um Git Hook remoto do tipo `post-receive` que roda no servidor assim que novos pacotes de commits chegam.

## 🛠️ Missão
1. Crie ou configure o script do hook no repositório *bare* remoto do servidor:
   `/var/git/api.git/hooks/post-receive`
2. O script do hook deve ser executável (`chmod +x /var/git/api.git/hooks/post-receive`).
3. Quando executado, o hook deve descompactar a versão mais recente do código diretamente no diretório do servidor web `/var/www/html`.
4. Use o comando de checkout apontando a `--work-tree` correta:
   `git --work-tree=/var/www/html checkout -f`

## 💡 Dicas e Exemplo de Estrutura
Um hook `post-receive` bare roda no contexto do repositório Git, então usar `--work-tree` força a extração dos arquivos de código na pasta de destino em vez da pasta Git:
```bash
#!/bin/bash
set -euo pipefail

# Extrair os arquivos na pasta de produção
git --work-tree=/var/www/html checkout -f
```

## 🎯 Critério de Sucesso
* O hook `/var/git/api.git/hooks/post-receive` deve existir e ter permissão de execução.
* Fazer `git push origin master` a partir do repositório local `/home/operator/api` deve disparar o hook e extrair os arquivos com sucesso para o diretório `/var/www/html`.
