# Nível 25 — Extração de Arquivos tar.gz

## 🎮 Contexto do Freela
Você acaba de fazer o download de um pacote de ferramentas utilitárias (`ferramentas.tar.gz`) que ajudarão a diagnosticar problemas na rede e descriptografar hashes do sistema antigo. Os arquivos estão compactados. Você precisa criar um diretório próprio e extraí-los lá dentro para que fiquem prontos para execução.

## 🛠️ Missão
1. Crie o diretório `/home/operator/tools/` caso ele não exista.
2. Descompacte e extraia o conteúdo do arquivo `/home/operator/ferramentas.tar.gz` diretamente para dentro do diretório `/home/operator/tools/`.

## 📝 Comandos Úteis
*   `tar`: Usado para extrair arquivos. As flags clássicas para descompactar arquivos `.tar.gz` são `-x` (extract), `-z` (gzip), `-f` (file).
*   Você pode usar a opção `-C` para especificar o diretório de destino da extração.
    *   Exemplo de uso: `tar -xzf arquivo.tar.gz -C /caminho/destino/`

## 🎯 Critério de Sucesso
O diretório `/home/operator/tools/` deve conter os arquivos `scan_network.sh` (que deve ser executável) e `decrypt_hash.py` devidamente extraídos.
