#!/bin/bash
set -euo pipefail

# Cria o script mock de df
cat << 'EOF' > /usr/local/bin/df
#!/bin/bash
if [[ "$*" == *"-i"* ]]; then
    echo "Filesystem      Inodes  IUsed   IFree IUse% Mounted on"
    echo "/dev/sda1      2621440 340000 2281440   13% /"
    echo "/dev/sda2      1310720 1280000   30720   98% /var"
    echo "/dev/sda3      3276800  50000 3226800    2% /home"
else
    echo "Filesystem      Size  Used Avail Use% Mounted on"
    echo "/dev/sda1        40G   12G   26G  32% /"
    echo "/dev/sda2        20G   19G  500M  97% /var"
    echo "/dev/sda3        50G   10G   37G  22% /home"
fi
EOF
chmod +x /usr/local/bin/df

chown -R operator:operator /home/operator
