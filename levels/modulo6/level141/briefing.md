# Nível 141 — O Primeiro Commit

## 🎮 Contexto do Freela
Você começou na TechVanguard, uma fintech de pagamento de rápido crescimento. Toda a infraestrutura da empresa era administrada via FTP de forma manual. Para evitar incidentes catastróficos, a gerência ordenou que toda alteração de código ou configuração deve ser mantida sob controle de versão. Sua primeira tarefa é inicializar o Git no diretório da API de pagamentos e assinar suas credenciais locais de operador.

## 🛠️ Missão
1. Navegue para o diretório `/home/operator/api`.
2. Inicialize o repositório Git local usando `git init`.
3. Configure o seu nome e e-mail no Git para assinar os commits. Para este ambiente, você pode configurar local ou globalmente:
   * Nome: `Operator` (ou o seu nome preferido)
   * E-mail: `operator@techvanguard.internal`
   * Comandos sugeridos:
     ```bash
     git config --global user.name "Operator"
     git config --global user.email "operator@techvanguard.internal"
     ```

## 🎯 Critério de Sucesso
* O diretório `/home/operator/api/.git` deve existir (indicando a inicialização do repositório).
* O Git deve reportar credenciais configuradas para `user.name` e `user.email` quando consultado a partir da pasta `/home/operator/api`.
