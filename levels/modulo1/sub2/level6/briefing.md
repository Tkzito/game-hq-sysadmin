# Nível 16 — Validação de Nulos (Garantindo a Integridade)

## 🎮 Contexto do Freela
Programas que rodam em servidores de produção frequentemente quebram quando recebem variáveis vazias. AURA-7 está tentando carregar um IP de conexão de rede, mas o script `/home/operator/valida_ip.sh` atual não faz nenhuma validação. Se o IP estiver vazio, o script tenta conectar a nada, causando um crash. Você deve adicionar uma verificação condicional que impede a execução se o IP estiver vazio (nulo).

## 🛠️ Missão
1. Edite o script `/home/operator/valida_ip.sh`.
2. Adicione uma condicional `if` que verifique se a variável `$IP` está vazia.
3. Se estiver vazia, o script deve imprimir a mensagem `"IP invalido"` e encerrar imediatamente a execução com `exit 1`.
4. Se o IP não estiver vazio, o script deve seguir o fluxo normal e imprimir a mensagem `"Conectando ao IP: ..."` (esta linha já existe no final do arquivo).

## 📝 Comandos Úteis
*   No Bash, `-z` testa se uma string é vazia (tamanho zero):
    ```bash
    if [ -z "$MINHA_VAR" ]; then
        echo "Esta vazia!"
    fi
    ```
*   O inverso é `-n`, que testa se a string *não* é vazia.

## 🎯 Critério de Sucesso
*   Quando o IP estiver vazio (comportamento padrão atual), rodar `./valida_ip.sh` deve imprimir `IP invalido`.
*   O script deve usar `-z` ou `-n` para fazer essa checagem condicional.
