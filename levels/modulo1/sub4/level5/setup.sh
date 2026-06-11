#!/bin/bash
# setup.sh - Nível 35
set -euo pipefail

cat << 'EOF' > /home/operator/cleanup.sh
#!/bin/bash
# Script com limpeza automática via trap

TEMP_DIR="/home/operator/tmp_run"

limpar_arquivos() {
    echo "Executando limpeza de segurança..."
    rm -rf "$TEMP_DIR"
}

# BUG: Falta registrar a função limpar_arquivos para ser acionada em caso de saída (EXIT) ou interrupções (SIGINT, SIGTERM).
# Adicione a instrução trap na linha abaixo para capturar os sinais EXIT, INT e TERM e executar a função 'limpar_arquivos'.

# Escreva aqui a instrução trap:


# Criar o diretório temporário
mkdir -p "$TEMP_DIR"
echo "DADOS_SENSIVEIS_DE_AUDITORIA" > "$TEMP_DIR/sessao.tmp"

echo "Diretório temporário criado em $TEMP_DIR."
echo "Processando dados..."
sleep 1
echo "Operação finalizada!"
EOF

chmod +x /home/operator/cleanup.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
