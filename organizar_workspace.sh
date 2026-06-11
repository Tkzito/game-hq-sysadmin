#!/bin/bash
# organize_workspace.sh - Script de Migração e Limpeza Física do Workspace (ROOT ACCESS)
# Mantém a integridade e consistência da pasta levels/ de acordo com o roadmap.

set -e

WORKSPACE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LEVELS_DIR="$WORKSPACE_DIR/levels"

echo "=== [ROOT ACCESS] Iniciando Sincronização de Pastas de Desafios ==="

# 1. Garantir que as estruturas básicas dos módulos existam
echo "[*] Criando estrutura de submódulos do Módulo 1..."
for sub in {1..10}; do
    mkdir -p "$LEVELS_DIR/modulo1/sub$sub"
    for lvl in {1..10}; do
        # Calcular o ID do nível baseado em 10 níveis por submódulo
        # Ex: sub1 level1 = nível 1; sub10 level10 = nível 100
        mkdir -p "$LEVELS_DIR/modulo1/sub$sub/level$lvl"
    done
done

echo "[*] Criando estrutura dos módulos 2 ao 8..."
# Módulos 2 a 8 contêm 10 níveis cada
# Mod 2 (101-110), Mod 3 (111-120), Mod 4 (121-130), Mod 5 (131-140), Mod 6 (141-150), Mod 7 (151-160), Mod 8 (161-170)
for mod in {2..8}; do
    mkdir -p "$LEVELS_DIR/modulo$mod"
    # Mapear os 10 níveis de cada módulo
    # Ex: modulo2/level101 a modulo2/level110
    start_lvl=$(( (mod - 1) * 10 + 91 ))
    end_lvl=$(( start_lvl + 9 ))
    for lvl in $(seq $start_lvl $end_lvl); do
        mkdir -p "$LEVELS_DIR/modulo$mod/level$lvl"
    done
done

# 2. Migração de arquivos legados
echo "[*] Migrando conteúdos das pastas legadas para a árvore correta..."

# Nível 1 legado -> modulo1/sub1/level1
if [ -d "$LEVELS_DIR/level1" ]; then
    echo "  -> Movendo levels/level1/ para levels/modulo1/sub1/level1/"
    # Copia o conteúdo incluindo arquivos ocultos (.manual_tecnico.txt e .pistas.txt)
    cp -r "$LEVELS_DIR/level1/." "$LEVELS_DIR/modulo1/sub1/level1/"
    rm -rf "$LEVELS_DIR/level1"
fi

# Nível 4 legado -> modulo1/sub1/level4
# Nota: Nível 4 antigo possui apenas o Dockerfile legado na estrutura original
if [ -d "$LEVELS_DIR/level4" ]; then
    echo "  -> Movendo levels/level4/ para levels/modulo1/sub1/level4/"
    cp -r "$LEVELS_DIR/level4/." "$LEVELS_DIR/modulo1/sub1/level4/"
    rm -rf "$LEVELS_DIR/level4"
fi

# Remover outras pastas legadas remanescentes vazias ou obsoletas de 2, 3 e 5
for legacy in level2 level3 level5; do
    if [ -d "$LEVELS_DIR/$legacy" ]; then
        echo "  -> Removendo pasta legada vazia: $legacy"
        rm -rf "$LEVELS_DIR/$legacy"
    fi
done

# 3. Validação de Estrutura Física
echo "[*] Auditando a estrutura final em levels/..."
MISSING=0

# Validar se o Nível 1 e 4 migrados possuem seus arquivos-chave
if [ ! -f "$LEVELS_DIR/modulo1/sub1/level1/Dockerfile" ]; then
    echo "  [ERRO] Dockerfile do Nível 1 não foi localizado após migração."
    MISSING=$((MISSING + 1))
fi

if [ ! -f "$LEVELS_DIR/modulo1/sub1/level4/Dockerfile" ]; then
    echo "  [ERRO] Dockerfile do Nível 4 não foi localizado após migração."
    MISSING=$((MISSING + 1))
fi

# Validar se as pastas físicas dos módulos existem
for m in {1..8}; do
    if [ ! -d "$LEVELS_DIR/modulo$m" ]; then
        echo "  [ERRO] Diretório levels/modulo$m ausente!"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -eq 0 ]; then
    echo "=== [SUCESSO] Sincronização física concluída. Nenhuma anomalia de arquivos detectada! ==="
else
    echo "=== [ALERTA] Sincronização concluída com $MISSING erros de consistência. Inspecione acima. ==="
    exit 1
fi
