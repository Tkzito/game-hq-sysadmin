#!/bin/bash
set -euo pipefail

# Cria o script mock de free
cat << 'EOF' > /usr/local/bin/free
#!/bin/bash
if [[ "$*" == *"-m"* ]]; then
    echo "               total        used        free      shared  buff/cache   available"
    echo "Mem:            7987        7372         153          12         460         358"
    echo "Swap:           2048        1843         205"
elif [[ "$*" == *"-g"* ]]; then
    echo "               total        used        free      shared  buff/cache   available"
    echo "Mem:               7           7           0           0           0           0"
    echo "Swap:              2           1           0"
else
    echo "               total        used        free      shared  buff/cache   available"
    echo "Mem:           7.8Gi       7.2Gi       150Mi        12Mi       450Mi       350Mi"
    echo "Swap:          2.0Gi       1.8Gi       200Mi"
fi
EOF
chmod +x /usr/local/bin/free

chown -R operator:operator /home/operator
