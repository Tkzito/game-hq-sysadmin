# Nível 10 — O Consolidador do Shell

## 🎮 Contexto do Freela
Você chegou ao último nível do módulo básico! AURA-7 precisa reconstituir seu painel de instrumentos virtuais. As configurações estão divididas em dois arquivos fragmentados dentro de `/home/operator/sistema_antigo/`: `parte1.txt` e `parte2.txt`. Para aplicar as configurações de forma segura, você precisa reestruturar o diretório e mesclar os arquivos.

## 🛠️ Missão
1. Crie uma pasta chamada `painel` na raiz do seu diretório (`/home/operator`).
2. Crie as subpastas `esquerdo` e `direito` dentro de `painel/` (caminhos finais: `painel/esquerdo` e `painel/direito`).
3. Mova o arquivo `/home/operator/sistema_antigo/parte1.txt` para `painel/esquerdo/`.
4. Mova o arquivo `/home/operator/sistema_antigo/parte2.txt` para `painel/direito/`.
5. Crie um arquivo chamado `config_mesclada.txt` dentro da pasta `painel/` que contenha o conteúdo de `painel/esquerdo/parte1.txt` seguido imediatamente (na linha seguinte) pelo conteúdo de `painel/direito/parte2.txt`.

## 📝 Comandos Úteis
*   `mkdir -p`: Cria diretórios aninhados.
*   `mv`: Move arquivos de um lugar para outro.
*   Redirecionamento com `cat`: Você pode usar `cat arquivo1 arquivo2 > arquivo_saida` para concatenar múltiplos arquivos em um novo!

## 🎯 Critério de Sucesso
*   Inexistência de `/home/operator/sistema_antigo/parte1.txt` e `/home/operator/sistema_antigo/parte2.txt`.
*   Existência dos arquivos nos novos caminhos de destino.
*   O arquivo `/home/operator/painel/config_mesclada.txt` deve conter:
    ```text
    [PAINEL_AURA]
    status_modulos=online
    ```
