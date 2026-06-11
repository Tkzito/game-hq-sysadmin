# Nível 17 — Códigos de Saída (Exit Codes)

## 🎮 Contexto do Freela
No ecossistema Unix, cada comando executado no terminal retorna um número inteiro chamado de **código de saída** ou **exit status**. A variável especial `$?` armazena o código de saída do último comando rodado. Um valor `0` indica sucesso, enquanto qualquer número de `1` a `255` indica falha. AURA-7 precisa rodar um script de backup `/home/operator/backup_db.sh` e ter certeza absoluta se ele funcionou ou não.

## 🛠️ Missão
1. Edite o script `/home/operator/backup_db.sh`.
2. Adicione uma lógica condicional imediatamente após o comando `cp` para ler o valor de `$?` (código de saída do `cp`).
3. Se o código de saída do `cp` for diferente de `0` (erro):
   *   O script deve ser encerrado imediatamente retornando status de erro `exit 1`.
4. Se o código de saída for `0` (sucesso):
   *   O script deve imprimir a frase `"Backup concluido"` na tela e encerrar retornando status de sucesso `exit 0`.

## 📝 Comandos Úteis
*   Para verificar se o último comando falhou:
    ```bash
    if [ $? -ne 0 ]; then
        exit 1
    fi
    ```
*   `exit N`: Encerra o script atual enviando o status N de volta para quem o chamou.

## 🎯 Critério de Sucesso
*   Se o arquivo `/home/operator/banco_original.db` não existir, o script `./backup_db.sh` deve falhar retornando um status de saída diferente de zero.
*   Se o arquivo existir, o script deve imprimir `Backup concluido` e retornar status de saída `0`.
