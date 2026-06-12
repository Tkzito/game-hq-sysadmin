# Nível 150 — [Desafio Integrado] A Pipeline Inquebrável

## 🎮 Contexto do Freela
Chegou o momento final na TechVanguard! O time está com o pipeline travado por conta de um conflito de merge, o deploy manual falhou, e chaves confidenciais continuam ameaçando vazar. Você deve unificar todos os aprendizados de controle de versão e Git Hooks para criar uma pipeline inquebrável e segura de deploy contínuo em produção.

## 🛠️ Missão
A partir da pasta do repositório local `/home/operator/api`:
1. **Resolução de Conflito:** Resolva o conflito pendente de merge no arquivo `app.conf`. Decida pela porta correta de produção (**9000**), remova os marcadores de conflito e faça o commit de finalização do merge.
2. **Hook de Segurança Local:** Crie um Git Hook local de `pre-commit` (`/home/operator/api/.git/hooks/pre-commit`) que bloqueie commits se chaves do tipo `PRIVATE_KEY` estiverem prestes a ser comitadas. Lembre-se de torná-lo executável (`chmod +x`).
3. **Hook de Deploy Automático:** Crie o Git Hook remoto `post-receive` em `/var/git/api.git/hooks/post-receive` que realize o checkout automatizado dos arquivos do repositório para o diretório `/var/www/html`. Torne-o executável (`chmod +x`).
4. **Deploy:** Após garantir a estabilidade do repositório, envie os seus commits locais para o servidor remoto usando o comando `git push origin master`.

## 💡 Dicas e Exemplo de Estrutura
* Use os mesmos scripts e hooks validados nos níveis anteriores.
* O hook `pre-commit` deve examinar os arquivos modificados em stage e retornar erro se encontrar a palavra `PRIVATE_KEY`.
* O hook `post-receive` no repositório bare remoto `/var/git/api.git` deve executar `git --work-tree=/var/www/html checkout -f`.

## 🎯 Critério de Sucesso
* Os conflitos em `app.conf` devem estar resolvidos.
* O arquivo `.git/hooks/pre-commit` local deve existir, ser executável e impedir a gravação de commits com `PRIVATE_KEY`.
* O arquivo `/var/git/api.git/hooks/post-receive` remoto deve existir, ser executável e fazer a extração do código após o push.
* Você deve rodar `git push origin master` com sucesso, sincronizando o repositório local e remoto, e preenchendo a pasta de deploy `/var/www/html`.
