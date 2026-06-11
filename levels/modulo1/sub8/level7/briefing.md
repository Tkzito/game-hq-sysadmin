# Nível 77 — Filtrando e Ordenando com Pipes (sort e uniq)

## 🎮 Contexto do Freela
Tivemos uma pequena tentativa de escaneamento de portas na rede local do laboratório. O histórico de conexões foi registrado no arquivo `/home/operator/access.log`, com os IPs de origem gerando múltiplas requisições. Para identificar as fontes sem repetição e de forma estruturada, AURA-7 precisa de uma lista contendo todos os IPs únicos, organizados em ordem numérica/alfabética.

## 🛠️ Missão
Processe o arquivo `/home/operator/access.log` encadeando a leitura do arquivo, a ordenação dos dados com `sort` e a remoção de linhas repetidas consecutivas com `uniq`. Redirecione o resultado final para o arquivo `/home/operator/ips_unicos.txt`.

## 📝 Comandos Úteis
*   `sort`: Ordena as linhas de texto recebidas na entrada.
*   `uniq`: Filtra e remove linhas duplicadas consecutivas da entrada (por isso, a entrada deve ser ordenada previamente).
*   `|`: Conecta a saída de um comando à entrada do próximo.

## 🎯 Critério de Sucesso
O arquivo `/home/operator/ips_unicos.txt` deve conter exatamente a lista de IPs ordenados e sem duplicatas:
```text
10.0.0.5
172.16.0.2
192.168.1.10
192.168.1.50
```
A validação vai analisar o histórico de comandos em busca das ferramentas `sort` e `uniq` encadeadas por pipes.
