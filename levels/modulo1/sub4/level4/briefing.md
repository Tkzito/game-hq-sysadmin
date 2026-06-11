# Nível 34 — Capturando Entrada Interativa com 'read'

## 🎮 Contexto do Freela
Você está implementando um assistente de diagnóstico para a rede neural AURA-7. O script `/home/operator/diagnostico.sh` deve perguntar de forma interativa ao operador se ele deseja iniciar a verificação de integridade dos circuitos neurais antes de prosseguir, evitando que o processo rode por engano.

## 🛠️ Missão
Edite o script `/home/operator/diagnostico.sh` para torná-lo interativo:
1. Adicione um comando `read` que peça ao operador para responder à pergunta: `Deseja iniciar o diagnostico? (SIM/NAO): `. Use a opção `-p` do comando `read` para exibir essa mensagem diretamente.
2. Salve o valor digitado na variável `RESPOSTA`.
3. Certifique-se de que a lógica condicional avalie a variável `RESPOSTA`:
   *   Se for `SIM`, exibe `Iniciando Diagnóstico...` e encerra com código `0`.
   *   Se for `NAO`, exibe `Diagnóstico Cancelado` e encerra com código `0`.
   *   Qualquer outra resposta deve exibir `Entrada Inválida` e encerrar com código `1`.

## 📝 Comandos Úteis
*   `read`: Lê uma linha a partir da entrada padrão.
    *   Exemplo: `read -p "Digite seu nome: " NOME` (a opção `-p` define o prompt de mensagem de texto a ser exibido).

## 🎯 Critério de Sucesso
O script `/home/operator/diagnostico.sh` deve perguntar de forma interativa, tratar corretamente "SIM", "NAO" e entradas inválidas, retornando os códigos de saída adequados (0 para SIM/NAO, 1 para inválidos).
