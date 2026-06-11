# Nível 20 — O Grande Validador do Módulo

## 🎮 Contexto do Freela
Chegou o momento do teste definitivo! Para subir a aplicação principal de AURA-7 para produção, você deve consolidar tudo o que aprendeu sobre scripts: Shebang, Strict Mode, Variáveis, Interpolação, Tratamento de erros e Códigos de Saída. O script `/home/operator/deploy.sh` foi iniciado de maneira desorganizada e com bugs. Seu dever é reconstruí-lo e aplicar todas as regras de qualidade que aprendeu.

## 🛠️ Missão
Edite o arquivo `/home/operator/deploy.sh` e aplique os seguintes ajustes:
1. Insira a Shebang do bash na linha 1.
2. Ative o modo estrito de segurança (Strict Mode) do Bash usando `set -euo pipefail`.
3. Defina a variável `APP_VERSION="2.0.1"`.
4. Faça uma cópia do arquivo `/home/operator/app.log` para `/home/operator/app_backup.log`.
5. Adicione tratamento ao código de retorno do comando `cp` anterior:
   *   Se falhar, o script deve terminar com `exit 1`.
   *   Se funcionar, deve imprimir `"Deploy 2.0.1 concluido"` (usando a variável dinamicamente) e terminar com `exit 0`.

## 🎯 Critério de Sucesso
*   O script `/home/operator/deploy.sh` deve rodar sem erros quando o arquivo de log existir, gerando o backup e imprimindo `Deploy 2.0.1 concluido`.
*   O script deve abortar com status de erro se o arquivo de log não existir.
*   Presença obrigatória de Shebang, Strict Mode e uso de variável de versão.
