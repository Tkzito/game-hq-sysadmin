# Nível 4 — Organizando a Casa

## 🎮 Contexto do Freela
Para começarmos a carregar módulos avançados para AURA-7, precisamos estruturar seu espaço de trabalho. Misturar scripts de inicialização com arquivos de configuração é uma péssima ideia e pode corromper sua memória.

## 🛠️ Missão
1. Crie uma pasta chamada `sistema` no seu diretório home (`/home/operator`).
2. Dentro dela, crie duas subpastas: `config` e `scripts` (caminhos finais: `sistema/config` e `sistema/scripts`).
3. Crie um arquivo vazio chamado `aura.conf` dentro da pasta `sistema/config`.

## 📝 Comandos Úteis
*   `mkdir <nome_pasta>`: Cria um novo diretório. Dica: use a opção `-p` (`mkdir -p`) para criar diretórios pai e filho de uma só vez (ex: `mkdir -p pasta/subpasta`).
*   `touch <nome_arquivo>`: Cria um arquivo vazio ou atualiza a data de modificação de um arquivo existente.

## 🎯 Critério de Sucesso
Os caminhos `/home/operator/sistema/config` e `/home/operator/sistema/scripts` devem existir, e o arquivo `/home/operator/sistema/config/aura.conf` deve estar presente.
