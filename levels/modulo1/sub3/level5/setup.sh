#!/bin/bash
# setup.sh - Nível 25
set -euo pipefail

# Criar arquivos temporários para compactar
mkdir -p /home/operator/.tmp_build

cat << 'EOF' > /home/operator/.tmp_build/scan_network.sh
#!/bin/bash
echo "Scanning networks..."
EOF

cat << 'EOF' > /home/operator/.tmp_build/decrypt_hash.py
#!/usr/bin/env python3
print("Decrypting hashes...")
EOF

chmod +x /home/operator/.tmp_build/scan_network.sh

# Compactar tudo em ferramentas.tar.gz
cd /home/operator
tar -czf ferramentas.tar.gz -C /home/operator/.tmp_build scan_network.sh decrypt_hash.py

# Limpar arquivos temporários de construção
rm -rf /home/operator/.tmp_build

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
