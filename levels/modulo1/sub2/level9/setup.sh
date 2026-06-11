#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 19
set -euo pipefail

mkdir -p /home/operator

# Criar script interativo base confirmacao.sh
cat << 'EOF' > /home/operator/confirmacao.sh
#!/bin/bash

# TODO: Use o comando read com a flag -p para capturar a resposta do jogador na variavel RESPOSTA.
# A pergunta deve ser exatamente: "Deseja inicializar a AURA-7? [S/N] "


# Bloco condicional (nao modifique):
if [ "$RESPOSTA" = "S" ] || [ "$RESPOSTA" = "s" ]; then
    echo "Inicializando AURA..."
else
    echo "Operacao abortada"
fi
EOF

chmod +x /home/operator/confirmacao.sh
chown -R operator:operator /home/operator
