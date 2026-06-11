#!/bin/bash
set -euo pipefail
echo '#!/bin/bash' > /home/operator/saudacao.sh
echo '# Seu codigo aqui para saudar o primeiro argumento' >> /home/operator/saudacao.sh
chmod +x /home/operator/saudacao.sh
