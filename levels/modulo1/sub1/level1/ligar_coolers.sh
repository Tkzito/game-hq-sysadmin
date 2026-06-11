#!/bin/bash
clear
echo "=================================================="
echo "    SISTEMA DE CONTINGÊNCIA - BUNKER 7            "
echo "=================================================="
echo ""

# Verifica se o malware ainda está rodando
if pgrep -f "crypto_miner" > /dev/null; then
    echo "[ERRO FATAL] Uso de CPU em 99.9%. Thermal Throttling ativo."
    echo "Não há recursos do sistema para ligar os exaustores."
    echo "DICA: Mate o processo ofensor antes de tentar novamente."
    exit 1
fi

# Verifica se o disco ainda está cheio
if [ -f /var/log/error_dump.log ]; then
    echo "sh: write error: No space left on device"
    echo "[ERRO FATAL] Impossível criar arquivo de lock dos coolers."
    echo "DICA: O disco está cheio. Remova os logs nocivos em /var/log/."
    exit 1
fi

echo "[+] Inicializando coolers principais de emergência..."
sleep 1
echo "[+] Acelerando ventoinhas para 4800 RPM..."
sleep 1
echo "[+] Temperatura do processador caindo: 89°C -> 75°C -> 42°C."
echo ""
echo "=================================================="
echo "    SISTEMA ONLINE - TEMPERATURA ESTÁVEL          "
echo "=================================================="

echo "ONLINE" > /tmp/status_sistema.txt
