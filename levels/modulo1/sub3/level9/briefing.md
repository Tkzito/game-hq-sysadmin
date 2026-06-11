# Nível 29 — Ação em Lote com 'find -exec'

## 🎮 Contexto do Freela
Sua auditoria de segurança encontrou múltiplos arquivos de configuração com dados sigilosos (`.conf`) espalhados pela pasta `/home/operator/configs/`. Atualmente, qualquer usuário do sistema pode ler esses arquivos porque eles estão com permissões de leitura mundial (`644`). Por regras de conformidade (Compliance), você precisa ajustar todas as permissões destes arquivos `.conf` de forma recursiva para leitura/escrita exclusivas do dono (`600`).

## 🛠️ Missão
1. Encontre de forma recursiva todos os arquivos que terminem com `.conf` sob o diretório `/home/operator/configs/`.
2. Para cada arquivo encontrado, altere a permissão para `600` utilizando o comando `chmod`.
3. **Restrição**: Você deve automatizar essa alteração para todos os arquivos encontrados em uma única linha usando a flag `-exec` do comando `find` ou redirecionando a busca. Os arquivos que não possuem extensão `.conf` (como `public.txt`) não devem ser alterados.

## 📝 Comandos Úteis
*   `find ... -exec [comando] {} \;` ou `find ... -exec [comando] {} +`: Permite que o `find` execute uma ação em lote para cada arquivo encontrado.
    *   Exemplo: `find /diretorio -name "*.log" -exec chmod 600 {} \;`
    *   O caractere `{}` é substituído pelo caminho do arquivo encontrado e `\;` finaliza a instrução do comando executado.

## 🎯 Critério de Sucesso
Todos os arquivos `.conf` sob o diretório `/home/operator/configs/` devem ter a permissão de acesso configurada exatamente como `600`, enquanto os demais tipos de arquivos não devem ter suas permissões alteradas.
