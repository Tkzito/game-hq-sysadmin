#!/bin/bash
set -euo pipefail
echo -e "#!/bin/bash\necho 'Fechamento de caixa concluído.'" > /home/operator/fechar_caixa.sh
chmod 644 /home/operator/fechar_caixa.sh
chown operator:operator /home/operator/fechar_caixa.sh
